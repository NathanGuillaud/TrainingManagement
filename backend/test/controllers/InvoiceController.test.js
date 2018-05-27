// // const request = require('supertest');
// const {
//   beforeAction,
//   afterAction,
// } = require('../setup/_setup');
// const Training = require('../../api/models/Training');
// const Role = require('../../api/models/Role');
// const User = require('../../api/models/User');
// const Course = require('../../api/models/Course');
// const Enrollment = require('../../api/models/Enrollment');

// let api;
// let user;
// let course1;
// let course2;
// let trainingObj;

// // exécutée avant tous les tests
// beforeAll(async () => {
//   api = await beforeAction();
//   await Training.create({
//     name: 'TEST NAME',
//     description: 'TEST DESCRIPTION',
//     address: 'TEST ADDRESS',
//     city: 'TEST CITY',
//     postalCode: '01234',
//   });

//   trainingObj = new Training();
//   // trouver le training
//   trainingObj = await Training.findOne({
//     where: {
//       name: 'TEST NAME',
//     },
//   });
//   // Course pour le getAll
//   course1 = await Course.create({
//     day: '2018-02-02',
//     begin: '09:30',
//     end: '12:00',
//     price: 8,
//     TrainingId: trainingObj.id,
//   });
//   course2 = await Course.create({
//     day: '2018-02-03',
//     begin: '13:30',
//     end: '17:00',
//     price: 9,
//     TrainingId: trainingObj.id,
//   });
//   // Il faut un user ayant le rôle user pour pouvoir manipuler ses inscriptions
//   const roleObj = await Role.create({
//     name: 'ROLE_USER',
//   });

//   // création d'un user avec le role user pour pouvoir s'inscrire à une course d'un training
//   user = await User.create({
//     username: 'martin',
//     email: 'martin.dupont@mail.com',
//     password: 'securepassword',
//     firstname: 'Martin',
//     lastname: 'Dupont',
//   });
//   await user.setAuthorities(roleObj);

//   // Création de 2 inscriptions pour l'utilisateur aux 2 séances du stage
//   await Enrollment.create({
//     UserId: user.id,
//     CourseId: course1.id,
//   });
//   await Enrollment.create({
//     UserId: user.id,
//     CourseId: course2.id,
//   });
// });

// afterAll(async () => {
//   api = await afterAction();
//   await user.destroy();
// });

// // test('Enrollment | get all by user id', async () => {
// //   const res = await request(api)
// //     .post('/api/public/auth')
// //     .set('Accept', /json/)
// //     .send({
// //       username: 'martin',
// //       password: 'securepassword',
// //     })
// //     .expect(200);

// //   expect(res.body.token).toBeTruthy();

// //   const res2 = await request(api)
// //     .get(`/api/private/users/${user.id}/invoices`)
// //     .set('Accept', /json/)
// //     .set('Authorization', `Bearer ${res.body.token}`)
// //     .set('Content-Type', 'application/json')
// //     .expect(200); // il s'attend à ce que le code de retour soit 200

// //   // vérifier que le corps réponse à la requête de invoice existe (non vide)
// //   expect(res2.body).toBeTruthy();
// //   // vérifier que le nombre de facture de cet utilisateur est bien de 1
// //   expect(res2.body.length).toBe(1);
// //   // vérifier que l'id est le bon
// //   expect(res2.body[0].id).toBe(1);
// //   // vérifier que l'id utilisateur est le bon
// //   expect(res2.body[0].UserId).toBe(user.id);
// //   // vérifier que l'id du stage est le bon
// //   expect(res2.body[0].CourseId).toBe(trainingObj.id);
// //   // vérifier que le prix est le bon
// //   expect(res2.body[0].price).toBe(17);
// // });
