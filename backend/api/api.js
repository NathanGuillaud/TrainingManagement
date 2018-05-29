// Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

// Third-pary librairies
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

// Server cnfiguration
const config = require('../config/');
const dbService = require('./services/db.service');
const auth = require('./policies/auth.policy');
const admin = require('./policies/admin.policy');

// Dev environment
const environment = process.env.NODE_ENV;

// Express application
const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');
const mappedAuthAdminRoutes = mapRoutes(config.privateAdminRoutes, 'api/controllers/');
const databaseHandler = dbService(environment, true).start();

// Utilisation de swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cross origin requests (CORS)
app.use(cors());

// Ssecure your Express apps by setting various HTTP headers
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));


// Secure private routes with JWT authentication and ADMIN role
app.all('/api/admin/private/*', (req, res, next) => auth(req, res, next), (req, res, next) => admin(req, res, next));

// Secure private routes with JWT authentication only
app.all('/api/private/*', (req, res, next) => auth(req, res, next));

// Body request parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express routes
app.use('/api/public', mappedOpenRoutes);
app.use('/api/private', mappedAuthRoutes);
app.use('/api/admin/private', mappedAuthAdminRoutes);

// Redirection du / vers /api-docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Start server
server.listen(config.port, () => databaseHandler);
