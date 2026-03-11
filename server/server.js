import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import transactionsRouter from './routes/transactions.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL || '*' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Expense tracker API is running' })
})

app.use('/transactions', transactionsRouter)

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('Missing MONGODB_URI in environment')
  process.exit(1)
}

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
