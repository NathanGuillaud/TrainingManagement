const Sequelize = require('sequelize');
const path = require('path');
const connection = require('./connection');

let database;

switch (process.env.NODE_ENV) {
  case 'development':
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password, {
        host: connection.development.host,
        dialect: connection.development.dialect,
      },
    );
    break;
  // Testing
  default:
    database = new Sequelize(
      connection.testing.database,
      connection.testing.username,
      connection.testing.password, {
        // disable logging; default: console.log
        logging: false,
        host: connection.testing.host,
        dialect: connection.testing.dialect,
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    );
}
module.exports = database;
