const express = require('express');
const config = require('./config/config.json')[process.env.PORT || 'development'];
const cors = require('./middlewares/cors');
const initDB = require('./config/user-DB');
const { connectDB } = require('./config/items-DB');
const itemController = require('./controllers/itemControllers');
const session = require('./middlewares/session');
const authController = require('./controllers/authController');


start()
async function start() {
    await initDB()
}

connectDB()
const app = express();
// app.use(express.urlencoded({extended: true})) //form value (stamdart HTML form)
app.use(cors());
app.use(session());
app.use(express.json());

app.use('/api/items', itemController)
app.use('/users', authController)

app.listen(config.PORT, () => console.log("Server running on", `http://localhost:${config.PORT}`));





