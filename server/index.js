require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const setup = require('./controllers/setup')
const userCtrl = require('./controllers/usersController')
const tweetCtrl = require('./controllers/tweetsController')

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

//! UTIL ENDPOINT.  USE TO SEED DB
app.post('/seed', setup.seedDb)

//* USER ENDPOINTS
app.get('/api/users', userCtrl.getAllUsers)
app.get('/api/users/:user_id', userCtrl.getUserById)
app.get('/api/users/:user_id/tweets', userCtrl.getUserTweets)

//* TWEET ENDPOINTS
app.get('/api/tweets', tweetCtrl.getAllTweets)
//! Drilling into a resource group
app.get('/api/tweets/:tweet_id/comments', tweetCtrl.getTweetComments)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set('db', db)
  console.log('DB ACTIVATED')
  app.listen(SERVER_PORT, () =>
    console.log(`PORT ${SERVER_PORT} IS NOW IN USE`)
  )
})
