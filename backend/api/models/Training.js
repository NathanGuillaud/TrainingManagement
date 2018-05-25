const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'training';

const Training = sequelize.define('Training', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  postalCode: Sequelize.INTEGER,

}, { tableName });

module.exports = Training;
