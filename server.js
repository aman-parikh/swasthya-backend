const express = require('express');
const cors = require('cors')
const app = express();
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
require('dotenv').config();
require('./config/database')
let portNumber = process.env.PORT

// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);

const RedisStore = connectRedis(session)

const redisClient = redis.createClient({legacyMode: true})
redisClient.connect().catch(console.error)

const corsOptions = {
  origin: 'http://localhost:3000',  //Your Client, do not write '*'
  credentials: true,
};

app.use(cors(corsOptions));
//session
app.use(
  session({
  name : "uid",
  credentials: true,
  store: new RedisStore({ client: redisClient, 
      disableTouch: true}),
  cookie : {
      httpOnly:false,
      sameSite:'lax', //csrf
      secure: false,
  },
  saveUninitialized : false,
  secret: "keyboard cat",
  resave: false,
  })
)

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


//payments


//nutrition



app.listen(portNumber, () => {
  console.log('server listening on port ' + portNumber)
})