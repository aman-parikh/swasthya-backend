const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
require('./config/database')
let portNumber = process.env.PORT || 3600

//health api to check if server is running
app.get('/health', (req, res) => {
  return res.status(200).json({
    result: "Server is running in full health"
  })
})

app.listen(portNumber, () => {
  console.log('server listening on port ' + portNumber)
})