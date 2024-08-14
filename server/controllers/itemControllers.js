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
    if ((Object.values(req.body).length == 0) || (Object.values(req.body).includes(''))){  
        return res.status(204).json({message: 'No content!'})
    }
    const { name, description, amount, updatedAt } = req.body;
    // const date = new Date().toISOString(); 
    const date = new Date().toISOString(); 
  
    db.run("INSERT INTO items (date, name, description, amount, updatedAt) VALUES (?, ?, ?, ?, ?)", [date, name, description, amount, updatedAt], function(err) {

        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json({ id: this.lastID, date, name, description, amount, updatedAt });
    });
});

//Get by ID
itemController.get('/:id', (req, res) => {
    if (!req.params.id){
        res.status(401).json({message: 'No content'})
    }
    db.all(`SELECT * FROM items WHERE ID = ${req.params.id}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        res.json(rows);
    });
});

//Del by ID
itemController.delete('/:id', async (req, res) => {
    let delItem = undefined
    db.all(`SELECT * FROM items WHERE ID = ${req.params.id}`, (err, rows) => {
        if (err) {
            res.status(500).send({message:'No such ID were found. Please refresh and try again.'}, err.message);
            return;
        }
        delItem = rows;
    });
    db.all(`DELETE FROM items WHERE ID=${req.params.id}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        res.json(delItem);
    });
    });
    
module.exports = itemController;