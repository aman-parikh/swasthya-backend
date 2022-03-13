const mongoose = require('mongoose')
var db_url = process.env.DB_URI
mongoose.connect(db_url).then(() => {
  console.log('connection to swasthya cloud database is successful');
}).catch(error => {
  console.log('connection failed: ' + error);
})