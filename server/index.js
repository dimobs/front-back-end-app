const express = require('express');
const config = require('./config/config.json')[process.env.PORT || 'development'];
const cors = require('./middlewares/cors');
const initDB = require('./config/user-DB');
const itemController = require('./middlewares/controllers/itemControllers');
const { connectDB } = require('./config/items-DB');


start()
async function start() {
    await initDB()
}

connectDB()
const app = express();
app.use(express.urlencoded({extended: true})) //form value
app.use(cors());
app.use(express.json());

app.use('/api/items', itemController)

app.listen(config.PORT, () => console.log("Server running on", `http://localhost:${config.PORT}`));





