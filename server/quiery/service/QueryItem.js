// const {db} = require('../config/items-DB');

const { db } = require("../../config/items-DB");


 function getAll(res) {
    
// db.all("SELECT * FROM items ORDER BY id DESC LIMIT 5", (err, rows) => {
   db.all("SELECT * FROM items ORDER BY id DESC", (err, rows) => {
    if (err) {
        res.status(500).send(err.message);
        return;
    }
  return rows
});

}

module.exports = getAll;