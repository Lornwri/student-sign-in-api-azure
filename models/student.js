module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING, // Sequelize STRING data type
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        starID: {
            type: DataTypes.STRING, // Sequelize STRING data type
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        present: {
            type: DataTypes.BOOLEAN, // Sequelize BOOLEAN data type
            allowNull: false,
            defaultValue: false,
        },
    });

    // Sync the model without dropping the table
    Student.sync({ force: false })
        .then(() => console.log('Synced student table'))
        .catch((err) => console.error('Error syncing student table:', err));

    return Student;
};
