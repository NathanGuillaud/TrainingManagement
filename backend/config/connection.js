const development = {
  database: 'trainingmanagement',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'postgres',
};

const production = {
  database: 'd6gsab8m1dgk72',
  username: 'onskfeomjkkarr',
  password: '06993e50110639398db1debf6f30faf759c608b782a2c7d0dee9aa5b2f99efd9',
  host: 'ec2-107-20-249-68.compute-1.amazonaws.com',
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
