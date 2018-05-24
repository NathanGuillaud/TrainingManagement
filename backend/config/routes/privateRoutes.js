const privateRoutes = {
  // Gestion des trainings
  'GET /trainings': 'TrainingController.getAll',
  'GET /trainings/:id': 'TrainingController.get',

  // Gestion des sessions
  'GET /sessions': 'SessionController.getAll',
  'GET /trainings/:trainingId/sessions': 'SessionController.getAllByTrainingId',
  'GET /sessions/:id': 'SessionController.get',

  // Gestion des enrollments
  'DELETE /enrollments/:id': 'EnrollmentController.remove',
  'POST /users/:userId/sessions/:sessionId/enrollments': 'EnrollmentController.create',
};

module.exports = privateRoutes;
