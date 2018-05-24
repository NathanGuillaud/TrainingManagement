const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Training = require('../../api/models/Training');
const Role = require('../../api/models/Role');
const User = require('../../api/models/User');
const Session = require('../../api/models/Session');
const Enrollment = require('../../api/models/Enrollment');

let api;
let user;

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
  // Session pour le getAll
  await Session.create({
    begin: '2018-02-02',
    end: '2018-02-02',
    price: 8,
    TrainingId: trainingObj.id,
  });
  await Session.create({
    begin: '2018-02-03',
    end: '2018-02-03',
    price: 9,
    TrainingId: trainingObj.id,
  });
  // Il faut un user ayant le rôle user pour pouvoir manipuler ses inscriptions
  const roleObj = await Role.create({
    name: 'ROLE_USER',
  });

  // création d'un user avec le role user pour pouvoir s'inscrire à une session d'un training
  user = await User.create({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
  });
  await user.setAuthorities(roleObj);
});

afterAll(async () => {
  api = await afterAction();
  await user.destroy();
});

test('Enrollment | create', async () => {
  let trainingObj = new Training();
  // trouver le training
  trainingObj = await Training.findOne({
    where: {
      name: 'TEST NAME',
    },
  });

  let sessionObj = new Session();
  // trouver la session
  sessionObj = await Session.findOne({
    where: {
      begin: '2018-02-02',
      end: '2018-02-02',
      TrainingId: trainingObj.id,
    },
  });

  // connexion du user
  const res = await request(api)
    .post('/api/public/auth')
    .set('Accept', /json/)
    .send({
      username: 'martin',
      password: 'securepassword',
    })
    .expect(200);

  expect(res.body.token).toBeTruthy();

  // création d'une inscription à une session d'un training
  const res2 = await request(api)
    .post(`/api/private/users/${user.id}/sessions/${sessionObj.id}/enrollments`)
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .send({})
    .expect(200);
  expect(res2.body).toBeTruthy();

  const enrollment = await Enrollment.findById(res2.body.id);

  expect(enrollment.id).toBe(res2.body.id);
  expect(enrollment.UserId).toBe(parseInt(res2.body.UserId, 0));
  expect(enrollment.SessionId).toBe(parseInt(res2.body.SessionId, 0));

  await enrollment.destroy();
});
