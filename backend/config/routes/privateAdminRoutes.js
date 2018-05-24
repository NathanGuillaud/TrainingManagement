const privateAdminRoutes = {
  'GET /users': 'UserController.getAll',
  'PUT /trainings/:id': 'TrainingController.update',
  'DELETE /trainings/:id': 'TrainingController.remove',
  'POST /trainings': 'TrainingController.create',
  'PUT /sessions/:id': 'SessionController.update',
  'DELETE /sessions/:id': 'SessionController.remove',
  'POST /trainings/:trainingId/sessions': 'SessionController.create',
};

module.exports = privateAdminRoutes;
