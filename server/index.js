require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const setup = require('./controllers/setup')

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

//! UTIL ENDPOINT.  USE TO SEED DB
app.post('/seed', setup.seedDb)

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
