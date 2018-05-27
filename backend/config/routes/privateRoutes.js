const privateRoutes = {
  // Gestion des trainings
  'GET /trainings': 'TrainingController.getAll',
  'GET /trainings/:id': 'TrainingController.get',

  // Gestion des courses
  'GET /courses': 'CourseController.getAll',
  'GET /trainings/:trainingId/courses': 'CourseController.getAllByTrainingId',
  'GET /courses/:id': 'CourseController.get',

  // Gestion des enrollments
  'DELETE /enrollments/:id': 'EnrollmentController.remove',
  'POST /users/:userId/courses/:courseId/enrollments': 'EnrollmentController.create',
  'GET /users/:userId/trainings/:trainingId/enrollments': 'EnrollmentController.getAllByUserIdTrainingId',
  'GET /users/:userId/enrollments': 'EnrollmentController.getAllByUserId',

  // Gestion des invoices
  'GET /users/:userId/invoices': 'InvoiceController.getAllByUserId',
};

module.exports = privateRoutes;
