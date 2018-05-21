const Sequelize = require('sequelize');
// const Session = require('../models/Session');

const sequelize = require('../../config/database');

const tableName = 'training';

const Training = sequelize.define('Training', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  postalCode: Sequelize.INTEGER,

}, { tableName });

// Training.hasMany(Session);


module.exports = Training;
