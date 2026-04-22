const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/', courseController.getAllCourses);

// Get single course by ID
router.get('/:id', courseController.getCourseById);

// Get course structure (years and semesters)
router.get('/:id/structure', courseController.getCourseStructure);

// Create new course
router.post('/', courseController.createCourse);

// Update course
router.put('/:id', courseController.updateCourse);

// Delete course
router.delete('/:id', courseController.deleteCourse);

module.exports = router;