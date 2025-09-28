const express = require('express')
const app = express()
const port = 8001
const pgp = require('pg-promise')(/* options */)

const db = pgp(process.env.DATABASE_URL)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

db.connect().then(() => {
  console.log('Database connected')
}).catch((err) => {
  console.log('Database not connected', err)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})