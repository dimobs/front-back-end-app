const itemController = require('express').Router()
const {db} = require('../config/items-DB');

// Get all items
itemController.get('/', (req, res) => {
    // db.all("SELECT * FROM items ORDER BY id DESC LIMIT 5", (err, rows) => {
        db.all("SELECT * FROM items ORDER BY id DESC", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Add a new item
itemController.post('/', (req, res) => {
    console.log(req.body);
    
    const { name, description, amount } = req.body;
    const date = new Date().toLocaleDateString(); 
  
    db.run("INSERT INTO items (date, name, description, amount) VALUES (?, ?, ?, ?)", [date, name, description, amount], function(err) {
        console.log(date, name, description, amount)
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json({ id: this.lastID, date, name, description, amount });
    });
});

itemController.get('/:itemId', (req, res) => {
    console.log('request for /:id');
    
    info = req.params;
    console.log(info.itemId);
    
    db.all(`SELECT * FROM items WHERE ID = ${info.itemId}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        res.json(rows);
    });
});

module.exports = itemController;