const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Training = require('../../api/models/Training');
const Role = require('../../api/models/Role');
const Member = require('../../api/models/Member');
const Course = require('../../api/models/Course');
const Enrollment = require('../../api/models/Enrollment');

let api;
let member;
let course1;
let course2;

// exécutée avant tous les tests
beforeAll(async () => {
  api = await beforeAction();
  await Training.create({
    name: 'TEST NAME',
    description: 'TEST DESCRIPTION',
    address: 'TEST ADDRESS',
    city: 'TEST CITY',
    postalCode: '01234',
  });

  let trainingObj = new Training();
  // trouver le training
  trainingObj = await Training.findOne({
    where: {
      name: 'TEST NAME',
    },
  });
  // Course pour le getAll
  course1 = await Course.create({
    day: '2018-02-02',
    begin: '09:30',
    end: '12:00',
    price: 8,
    TrainingId: trainingObj.id,
  });
  course2 = await Course.create({
    day: '2018-02-03',
    begin: '13:30',
    end: '17:00',
    price: 9,
    TrainingId: trainingObj.id,
  });
  // Il faut un member ayant le rôle member pour pouvoir manipuler ses inscriptions
  const roleObj = await Role.create({
    name: 'ROLE_USER',
  });

  // création d'un member avec le role member pour pouvoir s'inscrire à une course d'un training
  member = await Member.create({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
  });
  await member.setAuthorities(roleObj);

  // Création de 2 inscriptions pour l'utilisateur aux 2 séances du stage
  await Enrollment.create({
    MemberId: member.id,
    CourseId: course1.id,
  });
  await Enrollment.create({
    MemberId: member.id,
    CourseId: course2.id,
  });
});

afterAll(async () => {
  api = await afterAction();
  await member.destroy();
});

test('Enrollment | create', async () => {
  let trainingObj = new Training();
  // trouver le training
  trainingObj = await Training.findOne({
    where: {
      name: 'TEST NAME',
    },
  });

  let courseObj = new Course();
  // trouver la course
  courseObj = await Course.findOne({
    where: {
      day: '2018-02-02',
      TrainingId: trainingObj.id,
    },
  });

  // connexion du member
  const res = await request(api)
    .post('/api/public/auth')
    .set('Accept', /json/)
    .send({
      username: 'martin',
      password: 'securepassword',
    })
    .expect(200);

  expect(res.body.token).toBeTruthy();

  // création d'une inscription à une course d'un training
  const res2 = await request(api)
    .post(`/api/private/members/${member.id}/courses/${courseObj.id}/enrollments`)
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .send({})
    .expect(200);
  expect(res2.body).toBeTruthy();

  const enrollment = await Enrollment.findById(res2.body.id);

  expect(enrollment.id).toBe(res2.body.id);
  expect(enrollment.MemberId).toBe(parseInt(res2.body.MemberId, 0));
  expect(enrollment.CourseId).toBe(parseInt(res2.body.CourseId, 0));

  await enrollment.destroy();
});

test('Enrollment | get all by member id training id', async () => {
  let trainingObj = new Training();
  // récupération du stage
  trainingObj = await Training.findOne({
    where: {
      name: 'TEST NAME',
    },
  });

  course1 = new Course();
  // récupération de la séance 1
  course1 = await Course.findOne({
    where: {
      id: 1,
    },
  });

  course2 = new Course();
  // récupération de la séance 1
  course2 = await Course.findOne({
    where: {
      id: 2,
    },
  });

  const res = await request(api)
    .post('/api/public/auth')
    .set('Accept', /json/)
    .send({
      username: 'martin',
      password: 'securepassword',
    })
    .expect(200);

  expect(res.body.token).toBeTruthy();

  const res2 = await request(api)
    .get(`/api/private/members/${member.id}/trainings/${trainingObj.id}/enrollments`)
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .expect(200); // il s'attend à ce que le code de retour soit 200

  // vérifier que le corps réponse à la requête de enrollment existe (non vide)
  expect(res2.body).toBeTruthy();
  // vérifier que le nombre d'inscription au stage de cet utilisateur est bien de 2
  expect(res2.body.length).toBe(2);
  // vérifier que l'id est le bon
  expect(res2.body[0].id).toBe(1);
  // vérifier que l'id utilisateur est le bon
  expect(res2.body[0].MemberId).toBe(member.id);
  // vérifier que l'id de la séance est le bon
  expect(res2.body[0].CourseId).toBe(course1.id);
  // vérifier que l'id est le bon
  expect(res2.body[1].id).toBe(2);
  // vérifier que l'id utilisateur est le bon
  expect(res2.body[1].MemberId).toBe(member.id);
  // vérifier que l'id de la séance est le bon
  expect(res2.body[1].CourseId).toBe(course2.id);
});

test('Enrollment | get all by member id', async () => {
  course1 = new Course();
  // récupération de la séance 1
  course1 = await Course.findOne({
    where: {
      id: 1,
    },
  });

  course2 = new Course();
  // récupération de la séance 1
  course2 = await Course.findOne({
    where: {
      id: 2,
    },
  });

  const res = await request(api)
    .post('/api/public/auth')
    .set('Accept', /json/)
    .send({
      username: 'martin',
      password: 'securepassword',
    })
    .expect(200);

  expect(res.body.token).toBeTruthy();

  const res2 = await request(api)
    .get(`/api/private/members/${member.id}/enrollments`)
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .expect(200); // il s'attend à ce que le code de retour soit 200

  // vérifier que le corps réponse à la requête de enrollment existe (non vide)
  expect(res2.body).toBeTruthy();
  // vérifier que le nombre d'inscription au stage de cet utilisateur est bien de 2
  expect(res2.body.length).toBe(2);
  // vérifier que l'id est le bon
  expect(res2.body[0].id).toBe(1);
  // vérifier que l'id utilisateur est le bon
  expect(res2.body[0].MemberId).toBe(member.id);
  // vérifier que l'id de la séance est le bon
  expect(res2.body[0].CourseId).toBe(course1.id);
  // vérifier que l'id est le bon
  expect(res2.body[1].id).toBe(2);
  // vérifier que l'id utilisateur est le bon
  expect(res2.body[1].MemberId).toBe(member.id);
  // vérifier que l'id de la séance est le bon
  expect(res2.body[1].CourseId).toBe(course2.id);
});
