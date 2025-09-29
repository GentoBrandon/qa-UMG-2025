import express from 'express'
const app = express()
const port = 8000
import productRouter from './routes/route.js'
import dotenv from 'dotenv'
dotenv.config()

import { initializeDatabase } from './config/db.js'


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', productRouter)
initializeDatabase()
  .then(() => {
    app.listen(port,  () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing the database:', error);
    app.listen(port,  () => {
      console.log(`Server running (without DB) on http://localhost:${port}`);
    });
  });