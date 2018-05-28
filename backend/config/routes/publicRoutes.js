const publicRoutes = {
  'POST /signup': 'MemberController.register',
  'POST /auth': 'MemberController.login',
};

module.exports = publicRoutes;
