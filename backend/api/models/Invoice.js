const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Training = require('../models/Training');
const Member = require('../models/Member');

const tableName = 'invoice';

const Invoice = sequelize.define('Invoice', {
  price: {
    type: Sequelize.FLOAT,
  },
}, { tableName });

Invoice.belongsTo(Training);
Invoice.belongsTo(Member);

module.exports = Invoice;
