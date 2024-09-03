const itemController = require('express').Router()
const {db, TABLE_ITEMS} = require('../config/items-DB');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { hasUser } = require('../middlewares/guards');

// Get all items
itemController.get('/', (req, res) => {
    // db.all("SELECT * FROM items ORDER BY id DESC LIMIT 5", (err, rows) => {
        db.all(`SELECT * FROM ${TABLE_ITEMS} ORDER BY id DESC`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Add a new item
itemController.post('/', hasUser(), (req, res) => {    
    console.log(req.user._id);
    // const { userId } = req.user;
       
    if ((Object.values(req.body).length == 0) || (Object.values(req.body).includes(''))){  
        return res.status(204).json({message: 'No content!'})
    }
    const { name, description, amount, updatedAt } = req.body;
    // const date = new Date().toISOString(); 
    const date = new Date().toISOString(); 
  
    db.run(`INSERT INTO ${TABLE_ITEMS} (date, name, description, amount, updatedAt) VALUES (?, ?, ?, ?, ?)`, [date, name, description, amount, updatedAt], function(err) {

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
    
    // ToDo update hasChanged field
    const {name, description, amount } = req.body;

    if (!name || !description || !amount  ) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const updatedData = new Date().toISOString();

    db.run(
        `UPDATE ${TABLE_ITEMS} SET name = ?, description = ?, amount = ?, updatedAt = ? WHERE id = ?`,
        [name, description, amount, updatedData, req.params.id],
        function(err) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }

            if (this.changes == 0) {
                return res.status(400).json({message: 'Entry not found or no changes made' })
            }

            res.json({message: 'Entry updated successfully', id: req.params.id})
        }
    );
});

//Del by ID
itemController.delete('/:id', async (req, res) => {
    let delItem = undefined
    db.all(`SELECT * FROM ${TABLE_ITEMS} WHERE ID = ${req.params.id}`, (err, rows) => {
        if (err) {
            res.status(500).send({message:'No such ID were found. Please refresh and try again.'}, err.message);
            return;
        }

        delItem = rows;
    });
    db.all(`DELETE FROM ${TABLE_ITEMS} WHERE ID=${req.params.id}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        res.json(delItem);        
    });
    });
    
module.exports = itemController;