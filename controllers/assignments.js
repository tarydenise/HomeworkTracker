const { getDB } = require('../db/connect');
const { ObjectId } = require('mongodb');

async function getAllAssignments(req, res) {
    const assignments = await getDB().collection('assignments').find().toArray();
    res.json(assignments);
}

async function getAssignmentById(req, res) {
  try {
    const id = req.params.id;

    const assignment = await getDB()
      .collection('assignments')
      .findOne({ _id: new ObjectId(id) });

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
    const error = validateAssignment(req.body);
    if (error) return res.status(400).json({ error });

    const result = await getDB().collection('assignments').insertOne(req.body);

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Server error creating assignment" });
  }
}

async function updateAssignment(req, res) {
    try {
        const id = req.params.id;
        const updatedAssignment = req.body;
        const result = await getDB().collection('assignments').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedAssignment }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        const error = validateAssignment(req.body);
        if (error) return res.status(400).json({ error });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the assignment' });
    }
}

async function deleteAssignment(req, res) {
    try {
        const id = req.params.id;
        const result = await getDB().collection('assignments').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the assignment' });
    }
}

function validateAssignment(data) {
  if (!data.title || typeof data.title !== "string") return "Title is required";
  if (!data.class || typeof data.class !== "string") return "Class is required";
  if (!data.dueDate || typeof data.dueDate !== "string") return "Due date is required";
  if (typeof data.completed !== "boolean") return "Completed must be true or false";

  return null;
}

module.exports = {
    getAllAssignments,
    createAssignment,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
};