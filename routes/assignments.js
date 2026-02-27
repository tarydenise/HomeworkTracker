const { assignmentValidation } = require('../validation/validators.js');
const { handleValidationErrors } = require('../validation/handleValidationErrors.js');

const express = require('express');
const router = express.Router();
const controller = require('../controllers/assignments');

router.get('/', controller.getAllAssignments);
router.get('/:id', controller.getAssignmentById);
router.post('/', assignmentValidation, handleValidationErrors, controller.createAssignment);
router.put('/:id', assignmentValidation, handleValidationErrors, controller.updateAssignment);
router.delete('/:id', controller.deleteAssignment);

module.exports = router;