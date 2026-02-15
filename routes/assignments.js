const express = require('express');
const router = express.Router();
const controller = require('../controllers/assignments');

router.get('/', controller.getAllAssignments);
router.post('/', controller.createAssignment);
router.get('/:id', controller.getAssignmentById);
router.put('/:id', controller.updateAssignment);
router.delete('/:id', controller.deleteAssignment);

module.exports = router;