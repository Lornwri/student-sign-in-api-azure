const { Sequelize, DataTypes } = require('sequelize');
const createStudentModel = require('./student'); // Adjust path as needed

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Path to your SQLite database
});

// Create the Student model
const Student = createStudentModel(sequelize, DataTypes);

module.exports = { sequelize, Student };
