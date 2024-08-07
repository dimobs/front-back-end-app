const itemController = require('express').Router()
const {db} = require('../../config/items-DB')


// Get all items
itemController.get('/', (req, res) => {
    console.log('server get');
    
    db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Add a new item
itemController.post('/', (req, res) => {
    console.log('itemControlling requesting...');
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

module.exports = itemController;