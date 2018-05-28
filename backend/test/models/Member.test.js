const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Member = require('../../api/models/Member');

let member;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  member = await Member.build({
    username: 'martin',
    email: 'martin.dupont@mail.com',
    password: 'securepassword',
    firstname: 'Martin',
    lastname: 'Dupont',
  }).save();
});

test('Member is created correctly', async () => {
  const sendMember = member.toJSON();
  // check if member is created
  expect(member.email).toBe('martin.dupont@mail.com');
  // check if password is not send to browser
  expect(sendMember.password).toBeFalsy();

  await member.destroy();
});

test('Member is updated correctly', async () => {
  await member.update({
    email: 'peter@mail.com',
  });

  expect(member.email).toBe('peter@mail.com');

  await member.destroy();
});
