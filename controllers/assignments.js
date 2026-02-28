const { getDB } = require('../db/connect');
const { ObjectId } = require('mongodb');

async function getAllAssignments(req, res) {
  try {
    const db = getDB();
    const assignments = db.collection('assignments');

    const results = await assignments
      .find({ userId: new ObjectId(req.user._id) })
      .toArray();

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Server error retrieving assignments" });
  }
}

async function getAssignmentById(req, res) {
  try {
    const db = getDB();
    const assignments = db.collection('assignments');

    const assignment = await assignments.findOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user._id)
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Server error retrieving assignment" });
  }
}

async function createAssignment(req, res) {
  try {
    const db = getDB();
    const assignments = db.collection('assignments');

    const assignment = {
      title: req.body.title,
      dueDate: req.body.dueDate,
      class: req.body.class,
      completed: req.body.completed || false,
      userId: new ObjectId(req.user._id)
    }

    const result = await assignments.insertOne(assignment);

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Server error creating assignment" });
  }
}

async function updateAssignment(req, res) {
  try {
    const db = getDB();
    const assignments = db.collection('assignments');

    const result = await assignments.updateOne(
      { _id: new ObjectId(req.params.id), 
        userId: new ObjectId(req.user._id) },
      { $set: { 
        title: req.body.title, 
        dueDate: req.body.dueDate, 
        class: req.body.class, 
        completed: req.body.completed } }
    );
      
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.status(200).json({ message: "Assignment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the assignment' });
  }
}

async function deleteAssignment(req, res) {
  try {
    const db = getDB();
    const assignments = db.collection('assignments');

    const result = await assignments.deleteOne({
      _id: new ObjectId(req.params.id), 
      userId: new ObjectId(req.user._id) 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the assignment' });
  }
}

module.exports = {
    getAllAssignments,
    createAssignment,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
};