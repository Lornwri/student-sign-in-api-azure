const express = require('express');
const { Student } = require('../models'); // Ensure correct path to models

const router = express.Router();

// Get all students
router.get('/students', async (req, res, next) => {
    try {
        const students = await Student.findAll({ order: ['present', 'name'] });
        res.json(students);
    } catch (err) {
        next(err);
    }
});

// Create a new student
router.post('/students', async (req, res, next) => {
    try {
        const newStudent = req.body;
        await Student.create(newStudent);
        res.status(201).send('New Student created!');
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json(err.errors.map(e => e.message));
        } else {
            next(err);
        }
    }
});

// Update an existing student
router.patch('/students/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedStudent = req.body;
        const [rowsModified] = await Student.update(updatedStudent, { where: { id } });

        if (rowsModified === 0) {
            res.status(404).send('Student not found');
        } else {
            res.send('Student updated');
        }
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json(err.errors.map(e => e.message));
        } else {
            next(err);
        }
    }
});

// Delete a student
router.delete('/students/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await Student.destroy({ where: { id } });

        if (rowsDeleted === 0) {
            res.status(404).send('Student not found');
        } else {
            res.send('Student deleted');
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
