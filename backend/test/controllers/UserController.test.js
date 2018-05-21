const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const User = require('../../api/models/User');
const Role = require('../../api/models/Role');

let api;

beforeAll(async () => {
  api = await beforeAction();
  await Role.create({
    name: 'ROLE_USER',
  });
  await Role.create({
    name: 'ROLE_ADMIN',
  });
});

afterAll(() => {
  afterAction();
});

test('User | create', async () => {
  const res = await request(api)
    .post('/api/public/signup')
    .set('Accept', /json/)
    .send({
      username: 'martin',
      email: 'martin.dupont@mail.com',
      password: 'securepassword',
      firstname: 'Martin',
      lastname: 'Dupont',
      // password2: 'securepassword',
    })
    .expect(200);

  expect(res.body.user).toBeTruthy();

  const user = await User.findById(res.body.user.id);

  expect(user.id).toBe(res.body.user.id);
  expect(user.email).toBe(res.body.user.email);

  await user.destroy();
});

test('User | login', async () => {
  const user = await User.create({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
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

  expect(user).toBeTruthy();

  await user.destroy();
});

test('User | get all (auth)', async () => {
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
    .get('/api/admin/private/users')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .expect(200);

  expect(res2.body.users).toBeTruthy();
  expect(res2.body.users.length).toBe(1);

  await user.destroy();
});
