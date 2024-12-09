const express = require('express');
const { ValidationError } = require('sequelize'); // Import ValidationError directly
const database = require('../models');
const Student = database.Student;

const router = express.Router();

// Get all students
router.get('/students', function (req, res, next) {
    Student.findAll({ order: ['present', 'name'] })
        .then((students) => {
            return res.json(students);
        })
        .catch((err) => {
            return next(err);
        });
});

// Create a new student
router.post('/students', function (req, res, next) {
    const newStudent = req.body;
    console.log(newStudent);
    Student.create(newStudent)
        .then(() => { // Removed unused parameter
            return res.status(201).send('New Student created!');
        })
        .catch((err) => {
            if (err instanceof ValidationError) {
                const messages = err.errors.map((e) => e.message);
                return res.status(400).json(messages);
            } else {
                return next(err);
            }
        });
});

// Update an existing student by ID
router.patch('/students/:id', function (req, res, next) {
    const studentID = req.params.id;
    const updatedStudent = req.body;
    console.log(studentID, updatedStudent);

    Student.update(updatedStudent, { where: { id: studentID } })
        .then(([rowsModified]) => { // Directly destructure the result
            if (rowsModified === 1) {
                return res.send('Student updated');
            } else {
                return res.status(404).send('Student not found');
            }
        })
        .catch((err) => {
            if (err instanceof ValidationError) {
                const messages = err.errors.map((e) => e.message);
                return res.status(400).json(messages);
            } else {
                return next(err);
            }
        });
});

// Delete a student by ID
router.delete('/students/:id', function (req, res, next) {
    const studentID = req.params.id;
    Student.destroy({ where: { id: studentID } })
        .then((rowsDeleted) => {
            if (rowsDeleted === 1) {
                return res.send('Student deleted');
            } else {
                return res.status(404).send('Student not found');
            }
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;
