const Sequelize = require('sequelize');
const path = require('path');
const connection = require('./connection');

// const herokuUrl = process.env.DATABASE_URL;

let database;

switch (process.env.NODE_ENV) {
  case 'production':
    database = new Sequelize(process.env.DATABASE_URL, {
      logging: false,
      dialectOptions: {
        ssl: true, /* for SSL config since Heroku gives you this out of the box */
      },
    });
    break;
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
