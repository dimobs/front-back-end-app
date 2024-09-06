const itemController = require('express').Router();
const { db, TABLE_ITEMS } = require('../config/items-DB');
const { MongoClient, ObjectId } = require('mongodb');
const mongoConfig = require('../config/mongoConfig'); // Assuming you have MongoDB config

// MongoDB connection setup (you can reuse your existing MongoDB connection logic)
async function getUserById(userId) {
    const client = new MongoClient(mongoConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(mongoConfig.dbName);
        const users = database.collection('users');
        const user = await users.findOne({ _id: new ObjectId(userId) });
        return user;
    } catch (err) {
        console.error('Error fetching user from MongoDB:', err);
    } finally {
        await client.close();
    }
}

// Get all items with associated username from MongoDB
itemController.get('/', async (req, res) => {
    try {
        db.all(`SELECT * FROM ${TABLE_ITEMS} ORDER BY id DESC`, async (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }

            // Fetch the username from MongoDB for each item
            const itemsWithUsernames = await Promise.all(rows.map(async (item) => {
                const user = await getUserById(item.user_id); // Fetch user from MongoDB
                return {
                    ...item,
                    username: user ? user.username : 'Unknown', // Add username to each item
                };
            }));

            res.json(itemsWithUsernames);
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching items' });
    }
});

module.exports = itemController;
