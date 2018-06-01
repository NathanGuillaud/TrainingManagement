const privateRoutes = {
  // Gestion des trainings
  'GET /trainings': 'TrainingController.getAll',
  'GET /trainings/:id': 'TrainingController.get',
  'GET /trainings/:trainingId/members': 'MemberController.getAllByTrainingId',

  // Gestion des courses
  'GET /courses': 'CourseController.getAll',
  'GET /trainings/:trainingId/courses': 'CourseController.getAllByTrainingId',
  'GET /courses/:id': 'CourseController.get',

  // Gestion des enrollments
  'DELETE /enrollments/:id': 'EnrollmentController.remove',
  'POST /members/:memberId/courses/:courseId/enrollments': 'EnrollmentController.create',
  'GET /members/:memberId/trainings/:trainingId/enrollments': 'EnrollmentController.getAllByMemberIdTrainingId',
  'GET /members/:memberId/enrollments': 'EnrollmentController.getAllByMemberId',

  // Gestion des invoices
  'GET /members/:memberId/invoices': 'InvoiceController.getAllByMemberId',
};

module.exports = privateRoutes;
