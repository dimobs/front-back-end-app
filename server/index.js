const express = require('express');
const config = require('./config/config.json')[process.env.PORT || 'development'];
// // const cors = require('./middlewares/cors');
const cors = require('cors');
const initDB = require('./config/database');
const sqlite3 = require('sqlite3').verbose();

start()
async function start() {
    await initDB()
}
const app = express();
app.use(express.urlencoded({extended: true})) //form value
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, description TEXT, amount INTEGER)");
});

// Get all items
app.get('/api/items', (req, res) => {
    console.log('server resiving get...');
    
    db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Add a new item
app.post('/api/items', (req, res) => {
    console.log('server resiving post...');
    const { name, description, amount } = req.body;
    db.run("INSERT INTO items (name, description, amount) VALUES (?, ?, ?)", [name, description, amount], function(err) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json({ id: this.lastID, name, description, amount });
    });
});


app.listen(config.PORT, () => console.log("Server running on", `http://localhost:${config.PORT}`));





