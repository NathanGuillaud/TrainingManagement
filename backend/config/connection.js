const development = {
  database: 'trainingManagement',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql',
};

// const development = {
//   database: 'trainingManagement',
//   username: 'root',
//   password: 'root',
//   host: 'localhost',
//   dialect: 'mysql',
// };

const testing = {
  database: 'testauth',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'sqlite',
};

module.exports = {
  development,
  testing,
};
