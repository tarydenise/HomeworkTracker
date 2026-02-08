const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let db;

async function connectToDB() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

function getDB() {
    return db;
}

module.exports = {
    connectToDB,
    getDB
};