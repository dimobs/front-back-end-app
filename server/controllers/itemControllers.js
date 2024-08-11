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
    console.log(req.body, 'req.body');
    if (Object.values(req.body).length == 0)  {
        console.log('no body');        
        return res.status(204).json({message: 'No content!'})
    }
    const { name, description, amount, updatedAt } = req.body;
    const date = new Date().toISOString(); 
  
    db.run("INSERT INTO items (date, name, description, amount, updatedAt) VALUES (?, ?, ?, ?, ?)", [date, name, description, amount, updatedAt], function(err) {

        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json({ id: this.lastID, date, name, description, amount, updatedAt });
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