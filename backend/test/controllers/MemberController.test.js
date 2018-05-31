const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Member = require('../../api/models/Member');
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

test('Member | create', async () => {
  const res = await request(api)
    .post('/api/public/signup')
    .set('Accept', /json/)
    .send({
      username: 'martin',
      email: 'martin.dupont@mail.com',
      password: 'securepassword',
      firstname: 'Martin',
      lastname: 'Dupont',
      enabled: true,
      // password2: 'securepassword',
    })
    .expect(200);

  expect(res.body.member).toBeTruthy();

  const member = await Member.findById(res.body.member.id);

  expect(member.id).toBe(res.body.member.id);
  expect(member.email).toBe(res.body.member.email);

  await member.destroy();
});

test('Member | login', async () => {
  const member = await Member.create({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
    enabled: true,
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

  expect(member).toBeTruthy();

  await member.destroy();
});

test('Member | get all (auth)', async () => {
  let roleObj = new Role();

  roleObj = await Role.findOne({
    where: {
      name: 'ROLE_ADMIN',
    },
  });

  const member = await Member.create({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
    enabled: true,
  });
  await member.setAuthorities(roleObj);

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
    .get('/api/admin/private/members')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${res.body.token}`)
    .set('Content-Type', 'application/json')
    .expect(200);

  expect(res2.body.members).toBeTruthy();
  expect(res2.body.members.length).toBe(1);

  await member.destroy();
});
