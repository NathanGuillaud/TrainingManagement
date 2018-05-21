const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');
const Role = require('../models/Role');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptSevice().password(user);
  },
};

const tableName = 'user';

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  enabled: {
    type: Sequelize.BOOLEAN,
  },
}, { hooks, tableName });

// A user can have one to many roles
User.belongsToMany(Role, { through: 'user_role', as: 'authorities' });

User.prototype.toJSON = function cleanJson() {
  const values = Object.assign({ }, this.get());

  delete values.password;

  return values;
};

module.exports = User;
