const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Training = require('../models/Training');

const tableName = 'course';

const Course = sequelize.define('Course', {
  day: {
    type: Sequelize.DATEONLY,
  },
  begin: {
    type: Sequelize.TIME,
  },
  end: {
    type: Sequelize.TIME,
  },
  price: {
    type: Sequelize.FLOAT,
  },
}, { tableName });

Course.belongsTo(Training, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

module.exports = Course;
