import express from 'express'
import Transaction from '../models/Transaction.js'

const router = express.Router()

function parseDateString(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return null
  }
  return date
}

// Create transaction
router.post('/', async (req, res) => {
  try {
    const { date, type, category, item, amount } = req.body

    const parsedDate = parseDateString(date)
    if (!parsedDate) {
      return res.status(400).json({ message: 'Invalid date format' })
    }

    const txn = new Transaction({
      date: parsedDate,
      type,
      category,
      item,
      amount,
    })

    const saved = await txn.save()
    return res.status(201).json(saved)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to create transaction' })
  }
})

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 })
    return res.json(transactions)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to fetch transactions' })
  }
})

// Get transactions for a specific date (YYYY-MM-DD)
router.get('/:date', async (req, res) => {
  try {
    const dateString = req.params.date
    const date = parseDateString(dateString)
    if (!date) {
      return res.status(400).json({ message: 'Invalid date format' })
    }

    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + 1)

    const transactions = await Transaction.find({
      date: {
        $gte: start,
        $lt: end,
      },
    }).sort({ date: -1, createdAt: -1 })

    return res.json(transactions)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to fetch transactions' })
  }
})

export default router
