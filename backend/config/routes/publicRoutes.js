const publicRoutes = {
  'POST /signup': 'MemberController.register',
  'POST /auth': 'MemberController.login',
  'GET /account/verify': 'MemberController.verifyAccount',
};

module.exports = publicRoutes;
