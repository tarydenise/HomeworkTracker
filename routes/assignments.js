const { assignmentValidation } = require('../validation/validators.js');
const { handleValidationErrors } = require('../validation/handleValidationErrors.js');

const express = require('express');
const router = express.Router();
const controller = require('../controllers/assignments');
const requireAuth = require('../middleware/requireAuth');

router.get('/', requireAuth, controller.getAllAssignments);
router.get('/:id', requireAuth, controller.getAssignmentById);
router.post('/', requireAuth, assignmentValidation, handleValidationErrors, controller.createAssignment);
router.put('/:id', requireAuth, assignmentValidation, handleValidationErrors, controller.updateAssignment);
router.delete('/:id', requireAuth, controller.deleteAssignment);

module.exports = router;