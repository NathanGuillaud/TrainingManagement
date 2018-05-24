const Session = require('../models/Session');
const User = require('../models/User');

const sequelize = require('../../config/database');

const tableName = 'enrollment';

const Enrollment = sequelize.define('Enrollment', {
}, { tableName });

Enrollment.belongsTo(Session);
Enrollment.belongsTo(User);

module.exports = Enrollment;
