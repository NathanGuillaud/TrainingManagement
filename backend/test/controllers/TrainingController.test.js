const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Training = require('../../api/models/Training');
const Role = require('../../api/models/Role');
const User = require('../../api/models/User');

let api;

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
  // Il faut un user ayant le rôle admin pour pouvoir accéder aux training
  await Role.create({
    name: 'ROLE_ADMIN',
  });
});

afterAll(() => {
  afterAction();
});

test('Training | create', async () => {
  let roleObj = new Role();
  // trouver un role admin
  roleObj = await Role.findOne({
    where: {
      name: 'ROLE_ADMIN',
    },
  });

  // création d'un user avec le role admin pour pouvoir créer un training
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

  // création d'un training
  const res2 = await request(api)
    .post('/api/admin/private/trainings')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .send({
      name: 'TEST NAME',
      description: 'TEST DESCRIPTION',
      address: 'TEST ADDRESS',
      city: 'TEST CITY',
      postalCode: '01234',
    })
    .expect(200);
  expect(res2.body).toBeTruthy();

  const training = await Training.findById(res2.body.id);

  expect(training.id).toBe(res2.body.id);
  expect(training.name).toBe(res2.body.name);
  // expect(training.postalCode).toBe(res2.body.postalCode);

  await training.destroy();
  await user.destroy();
});

test('Training | get all', async () => {
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
    .get('/api/private/trainings')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .expect(200); // il s'attend à ce que le code de retour soit 200

  // vérifier que le corps réponse à la requête de training existe (non vide)
  expect(res2.body).toBeTruthy();
  // vérifier que la longueur des training est bien de 1
  expect(res2.body.length).toBe(1);
  // vérifier que le libellé est le bon
  expect(res2.body[0].name).toBe('TEST NAME');

  await user.destroy();
});
