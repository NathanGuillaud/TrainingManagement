const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Training = require('../../api/models/Training');
const Role = require('../../api/models/Role');
const User = require('../../api/models/User');
const Session = require('../../api/models/Session');

let api;

// exécutée avant tous les tests
beforeAll(async () => {
  api = await beforeAction();
  await Training.create({
    name: 'TEST NAME2',
    description: 'TEST DESCRIPTION',
    address: 'TEST ADDRESS',
    city: 'TEST CITY',
    postalCode: '01234',
  });

  let trainingObj = new Training();
  // trouver le training
  trainingObj = await Training.findOne({
    where: {
      name: 'TEST NAME2',
    },
  });
  // Session pour le getAll
  await Session.create({
    begin: '2018-02-02 10:00:00',
    end: '2018-02-02 11:00:00',
    price: '8',
    TrainingId: trainingObj.id,
  });
  // Il faut un user ayant le rôle admin pour pouvoir accéder aux training
  await Role.create({
    name: 'ROLE_ADMIN',
  });
});

afterAll(() => {
  afterAction();
});

test('Session | create', async () => {
  let roleObj = new Role();
  // trouver un role admin
  roleObj = await Role.findOne({
    where: {
      name: 'ROLE_ADMIN',
    },
  });

  let trainingObj = new Training();
  // trouver le training
  trainingObj = await Training.findOne({
    where: {
      name: 'TEST NAME2',
    },
  });

  // création d'un user avec le role admin pour pouvoir créer une session au training
  const user = await User.create({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
  });
  await user.setAuthorities(roleObj);

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

  // création d'une session au training
  const res2 = await request(api)
  // training 1
    .post('/api/admin/private/trainings/1/sessions')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .send({
      begin: '2018-01-01 09:30:00',
      end: '2018-01-01 12:00:00',
      price: '7.5',
      TrainingId: trainingObj.id,
    })
    .expect(200);
  expect(res2.body).toBeTruthy();

  const session = await Session.findById(res2.body.id);

  expect(session.id).toBe(res2.body.id);
  // expect(session.begin).toBe(res2.body.begin);
  // expect(session.price).toBe(res2.body.price);

  await session.destroy();
  await user.destroy();
});

test('Session | get all', async () => {
  let roleObj = new Role();

  roleObj = await Role.findOne({
    where: {
      name: 'ROLE_ADMIN',
    },
  });

  const user = await User.create({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
  });
  await user.setAuthorities(roleObj);

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
    .get('/api/private/sessions')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .expect(200); // il s'attend à ce que le code de retour soit 200

  // vérifier que le corps réponse à la requête de training existe (non vide)
  expect(res2.body).toBeTruthy();
  // vérifier que la longueur des sessions est bien de 1
  expect(res2.body.length).toBe(1);
  // vérifier que l'id est le bon
  expect(res2.body[0].id).toBe(1);
  // vérifier que la date de début est la bonne
  // expect(res2.body[0].begin).toBe('2018-02-02 10:00:00');
  expect(res2.body[0].TrainingId).toBe(1);

  await user.destroy();
});

test('Session | get all by training id', async () => {
  let roleObj = new Role();

  roleObj = await Role.findOne({
    where: {
      name: 'ROLE_ADMIN',
    },
  });

  const user = await User.create({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
  });
  await user.setAuthorities(roleObj);

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
  // tests avec training d'id 1
    .post('/api/admin/private/trainings/1/sessions')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .send({
      begin: '2018-02-02 10:00:00',
      end: '2018-02-02 11:00:00',
      price: '8',
      TrainingId: 1,
    })
    .expect(200); // il s'attend à ce que le code de retour soit 200

  expect(res2.body).toBeTruthy();

  const res3 = await request(api)
    .get('/api/private/sessions')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .expect(200); // il s'attend à ce que le code de retour soit 200

  // vérifier que le corps réponse à la requête de training existe (non vide)
  expect(res3.body).toBeTruthy();
  // vérifier que la longueur des sessions du training est bien de 1
  expect(res3.body.length).toBe(2);
  // vérifier que l'id est le bon
  expect(res3.body[0].id).toBe(1);
  // vérifier que la dta de début est la bonne
  // expect(res2.body[0].begin).toBe('2018-02-02 10:00:00');

  await user.destroy();
});
