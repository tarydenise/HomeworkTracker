const express = require('express');
const router = express.Router();
const controller = require('../controllers/assignments');

router.get('/', controller.getAllAssignments);
router.post('/', controller.createAssignments);

module.exports = router;