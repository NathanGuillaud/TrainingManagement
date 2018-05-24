const privateAdminRoutes = {
  // Gestion des users
  'GET /users': 'UserController.getAll',

  // Gestion des trainings
  'PUT /trainings/:id': 'TrainingController.update',
  'DELETE /trainings/:id': 'TrainingController.remove',
  'POST /trainings': 'TrainingController.create',

  // Gestion des sessions
  'PUT /sessions/:id': 'SessionController.update',
  'DELETE /sessions/:id': 'SessionController.remove',
  'POST /trainings/:trainingId/sessions': 'SessionController.create',
};

module.exports = privateAdminRoutes;
