const privateAdminRoutes = {
  // Gestion des members
  'GET /members': 'MemberController.getAll',

  // Gestion des trainings
  'PUT /trainings/:id': 'TrainingController.update',
  'DELETE /trainings/:id': 'TrainingController.remove',
  'POST /trainings': 'TrainingController.create',

  // Gestion des courses
  'PUT /courses/:id': 'CourseController.update',
  'DELETE /courses/:id': 'CourseController.remove',
  'POST /trainings/:trainingId/courses': 'CourseController.create',
};

module.exports = privateAdminRoutes;
