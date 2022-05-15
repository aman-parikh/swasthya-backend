const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
require('dotenv').config();
require('./config/database')
let portNumber = process.env.PORT

// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

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
app.use('/coach', require('./routes/coach.route'))

//class
app.use('/class', require('./routes/class.route'))

//payments


//nutrition


app.listen(portNumber, () => {
  console.log('server listening on port ' + portNumber)
})