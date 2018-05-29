const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');
const Role = require('../models/Role');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(member) {
    member.password = bcryptSevice().password(member);
  },
};

const tableName = 'member';

const Member = sequelize.define('Member', {
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
  address: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  postalCode: {
    type: Sequelize.INTEGER,
  },
  birthDate: {
    type: Sequelize.DATE,
  },
  gender: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

// A member can have one to many roles
Member.belongsToMany(Role, { through: 'member_role', as: 'authorities' });

Member.prototype.toJSON = function cleanJson() {
  const values = Object.assign({ }, this.get());

  delete values.password;

  return values;
};

module.exports = Member;
