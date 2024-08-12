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
        console.log(Object.values(req.body).includes(''));
        
    if ((Object.values(req.body).length == 0) || (Object.values(req.body).includes(''))){
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
    db.all(`SELECT * FROM items WHERE ID = ${info.itemId}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        res.json(rows);
    });
});

itemController.delete('/:id', async (req, res) => {
    console.log(req.params, 'deleting...');
    
        try {
            let comments = await service.readDataFile();
            const index = comments.findIndex(c => c.commentId === req.params.id);
    
            if (index === -1) {
                return res.status(404).json({ error: 'Comment not found' });
            }
    
            const deletedComment = comments.splice(index, 1)[0];
    
            await service.writeDataFile(comments);
    
            res.json(deletedComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    

module.exports = itemController;