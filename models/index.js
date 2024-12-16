const { Sequelize, DataTypes } = require('sequelize');
const createStudentModel = require('./student'); // Adjust path as needed

// Load environment variables (e.g., DB credentials, Azure configs)
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

// Initialize Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME || 'student-sign-in-database',          // Database name
    process.env.DB_USER || 'natashaw',                         // Username
    process.env.DB_PASSWORD || '%QNy^5r7sCpRZE*d8AeY',         // Password
    {
        host: process.env.DB_HOST || 'student-sign-in-database-server-natashaw.database.windows.net', // Hostname
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, // Enable encryption for Azure SQL
            },
        },
        logging: console.log, // Log SQL queries
    }
);

// Create the Student model
const Student = createStudentModel(sequelize, DataTypes);

// Test the database connection during startup
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
})();

module.exports = { sequelize, Student };
