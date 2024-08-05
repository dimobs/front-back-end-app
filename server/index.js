const express = require('express');
const config = require('./config/config.json')[process.env.PORT || 'development'];
const initDB = require('./config/database');
const cors = require('./middlewares/cors');

start()
async function start() {
    await initDB()
}

const app = express();
app.use(express.urlencoded({extended: true})) //form value
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'REST service operational' });
});

app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT} App is running on `));
