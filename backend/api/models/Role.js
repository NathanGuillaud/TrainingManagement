const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'role';

const Role = sequelize.define('Role', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
}, { tableName });

module.exports = Role;
