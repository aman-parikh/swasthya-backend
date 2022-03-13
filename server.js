const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
require('./config/database')
let portNumber = process.env.PORT || 3600

app.use(cors());
//health api to check if server is running
app.get('/health', (req, res) => {
  return res.status(200).json({
    result: "Server is running in full health"
  })
})

//all apis

//user
const userRouter = require('./routes/user.route')
app.use('/user', userRouter)

//coach


//class


//payments


//nutrition



app.listen(portNumber, () => {
  console.log('server listening on port ' + portNumber)
})