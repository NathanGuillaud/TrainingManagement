const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Training = require('../models/Training');
const User = require('../models/User');

const tableName = 'invoice';

const Invoice = sequelize.define('Invoice', {
  price: {
    type: Sequelize.FLOAT,
  },
}, { tableName });

Invoice.belongsTo(Training);
Invoice.belongsTo(User);

module.exports = Invoice;
