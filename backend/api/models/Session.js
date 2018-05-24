const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Training = require('../models/Training');

const tableName = 'session';

const Session = sequelize.define('Session', {
  begin: {
    type: Sequelize.DATEONLY,
  },
  end: {
    type: Sequelize.DATEONLY,
  },
  price: {
    type: Sequelize.FLOAT,
  },
}, { tableName });

Session.belongsTo(Training, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

module.exports = Session;
