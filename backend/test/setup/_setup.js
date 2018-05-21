const bodyParser = require('body-parser');
const express = require('express');
const mapRoutes = require('express-routes-mapper');

const config = require('../../config/');
const database = require('../../config/database');
const auth = require('../../api/policies/auth.policy');
const admin = require('../../api/policies/admin.policy');

const beforeAction = async () => {
  const testapp = express();
  const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
  const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');
  const mappedAuthAdminRoutes = mapRoutes(config.privateAdminRoutes, 'api/controllers/');

  testapp.all('/api/private/*', (req, res, next) => auth(req, res, next));
  testapp.all('/api/admin/private/*', (req, res, next) => auth(req, res, next), (req, res, next) => admin(req, res, next));

  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());

  testapp.use('/api/public', mappedOpenRoutes);
  testapp.use('/api/private', mappedAuthRoutes);
  testapp.use('/api/admin/private', mappedAuthAdminRoutes);

  await database.authenticate();
  await database.drop();
  await database.sync().then(() => console.log('Connection to the database has been established successfully'));

  return testapp;
};

const afterAction = async () => {
  await database.close();
};


module.exports = { beforeAction, afterAction };
