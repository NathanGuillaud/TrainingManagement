const Course = require('../models/Course');
const User = require('../models/User');

const sequelize = require('../../config/database');

const tableName = 'enrollment';

const Enrollment = sequelize.define('Enrollment', {
}, { tableName });

Enrollment.belongsTo(Course);
Enrollment.belongsTo(User);

module.exports = Enrollment;
