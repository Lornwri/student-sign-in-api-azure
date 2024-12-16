const { Sequelize, DataTypes } = require('sequelize');
const createStudentModel = require('./student'); // Adjust path as needed

// Load environment variables (e.g., DB credentials, Azure configs)
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'student-sign-in-database ',         // Database name
    process.env.DB_USER || 'natashaw',         // Username
    process.env.DB_PASSWORD, '%QNy^5r7sCpRZE*d8AeY'   // Password
    {
        host: process.env.DB_HOST || 'student-sign-in-database-server-natashaw.windows.net'// Hostname
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: false, // Disable only if necessary for local testing
            }
        }
        logging: false, // Disable SQL query logging in production

); //code help by Jetbrains IDE

// Create the Student model
const Student = createStudentModel(sequelize, DataTypes);

module.exports = { sequelize, Student };
