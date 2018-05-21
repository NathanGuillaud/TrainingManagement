const publicRoutes = {
  'POST /signup': 'UserController.register',
  'POST /auth': 'UserController.login',
};

module.exports = publicRoutes;
