const privateRoutes = {
  'GET /trainings': 'TrainingController.getAll',
  'GET /trainings/:id': 'TrainingController.get',
  'GET /sessions': 'SessionController.getAll',
  'GET /trainings/:trainingId/sessions': 'SessionController.getAllByTrainingId',
  'GET /sessions/:id': 'SessionController.get',
};

module.exports = privateRoutes;
