const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');
const privateAdminRoutes = require('./routes/privateAdminRoutes');

module.exports = {
  migrate: true,
  privateRoutes,
  publicRoutes,
  privateAdminRoutes,
  port: process.env.PORT || '8080',
};
