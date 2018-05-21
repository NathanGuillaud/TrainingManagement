const privateRoutes = {
  'GET /trainings': 'TrainingController.getAll',
  'GET /trainings/:id': 'TrainingController.get',
  'PUT /trainings/:id': 'TrainingController.update',
  'DELETE /trainings/:id': 'TrainingController.remove',
  'POST /trainings': 'TrainingController.create',
};

module.exports = privateRoutes;
