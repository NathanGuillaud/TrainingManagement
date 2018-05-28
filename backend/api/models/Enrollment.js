const Course = require('../models/Course');
const Member = require('../models/Member');

const sequelize = require('../../config/database');

const tableName = 'enrollment';

const Enrollment = sequelize.define('Enrollment', {
}, { tableName });

Enrollment.belongsTo(Course);
Enrollment.belongsTo(Member);

module.exports = Enrollment;
