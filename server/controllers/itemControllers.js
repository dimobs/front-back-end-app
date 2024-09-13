const itemController = require('express').Router()
const { db, TABLE_ITEMS } = require('../config/items-DB');
const { hasUser } = require('../middlewares/guards');
const { ObjectId } = require('mongodb');
const { getById } = require('./userService');

// Get all items
itemController.get('/', (req, res) => {
    try {
        db.all(`SELECT * FROM ${TABLE_ITEMS} ORDER BY id DESC`, async (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }

            const itemsWithUsernames = await Promise.all(rows.map(async (item) => {
                const user = await getById(item.user_id);
                return {
                    ...item,
                    username: user ? user : "Unknown"
                };
            }));

            res.json(itemsWithUsernames);
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching items' })
    }
});

//Create
itemController.post('/', hasUser(), (req, res) => {
    const user_id = req.user._id
    const { name, description, amount, method, updatedAt } = req.body;

    if ((Object.values(req.body).length == 0) || (Object.values(req.body).includes(''))) {
        return res.status(204).json({ message: 'No content!' })
    }
    if (!ObjectId.isValid(user_id)) {
        res.status(400).json({ message: 'Invalid user ID' });
        res.redirect('/login');
    }

    const date = new Date().toISOString();

    db.run(`INSERT INTO ${TABLE_ITEMS} (date, user_id, name, description, amount, method, updatedAt ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [date, user_id, name, description, amount, method, updatedAt ], async function (err) {
        if (err) {
            console.log(err.message);

            res.status(500).send(err.message);
            return;
        }
        const user = await getById(user_id);

        res.json({ id: this.lastID, date, name, description, amount, method, updatedAt, username: user ? user : 'Unknown' });
    });
});

//Get by ID
itemController.get('/:id', (req, res) => {
    if (!req.params.id) {
        res.status(401).json({ message: 'No content' })
    }
    // ToDo! try catch
    db.all(`SELECT * FROM ${TABLE_ITEMS} WHERE ID = ${req.params.id}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        res.json(rows);
    });
});

//update
itemController.put('/:id', hasUser(), (req, res) => {
    const { name, description, amount } = req.body;

    if (!name || !description || !amount) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const ownerId = req.user._id;
    const rowId = req.params.id;
    
    const updatedData = new Date().toISOString();

    db.get(`SELECT * FROM ${TABLE_ITEMS} WHERE id = ? and user_id = ?`, [rowId, ownerId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }

        if (!row) {
            console.error({ message: "Unauthorized to update this entry" });
            return res.status(403).json({ message: 'Unauthorized to update this entry' })
        }

        db.run(
            `UPDATE ${TABLE_ITEMS} SET name = ?, description = ?, amount = ?, updatedAt = ? WHERE id = ?`,
            [name, description, amount, updatedData, req.params.id],
            function (err) {
                if (err) {
                    res.status(500).send(err.message);
                    return;
                }

                if (this.changes == 0) {
                    return res.status(400).json({ message: 'Entry not found or no changes made' })
                }

                res.json({ message: 'Entry updated successfully', id: req.params.id })
            }
        );
    })
});

//Del by ID
itemController.delete('/:id', hasUser(), (req, res) => {
    const ownerId = req.user._id
    const rowId = req.params.id

    db.get(`SELECT * FROM ${TABLE_ITEMS} where id = ? and user_id = ?`, [rowId, ownerId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        if (!row) {
            console.error('Unauthorized to delete this entry');
            return res.status(403).json({ message: 'Unauthorized to delete this entry' });
        }
       const name = row.name;
        
        db.run(`DELETE FROM ${TABLE_ITEMS} WHERE id = ?`, [req.params.id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(err.message)
            }
            res.json({ message: 'Entry deleted successfully', id: req.params.id, name });
        });
    });
});

module.exports = itemController;