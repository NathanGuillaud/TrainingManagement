const development = {
  database: 'trainingmanagement',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'postgres',
};

const production = {
  database: 'trainingmanagement',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'postgres',
};

const testing = {
  database: 'testauth',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'sqlite',
};

module.exports = {
  development,
  production,
  testing,
};
