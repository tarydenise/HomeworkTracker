const { getDB } = require('../db/connect');
const { ObjectId } = require('mongodb');

async function getAllAssignments(req, res) {
    const assignments = await getDB().collection('assignments').find().toArray();
    res.json(assignments);
}

async function createAssignments(req, res) {
    const newAssignment = req.body;
    const result = await getDB().collection('assignments').insertOne(newAssignment);
    res.status(201).json({ id: result.insertedId });
}

module.exports = {
    getAllAssignments,
    createAssignments
};