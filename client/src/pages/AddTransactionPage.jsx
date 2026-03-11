import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTransactions } from '../context/TransactionsContext'

const defaultForm = (today) => ({
  date: today,
  type: 'expense',
  category: 'home',
  item: '',
  amount: '',
})

export default function AddTransactionPage() {
  const navigate = useNavigate()
  const { addTransaction } = useTransactions()
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const [form, setForm] = useState(defaultForm(today))
  const [status, setStatus] = useState({ message: '', type: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ message: '', type: '' })

    if (!form.item.trim() || !form.amount) {
      setStatus({ message: 'Please provide an item name and amount.', type: 'error' })
      return
    }

    try {
      await addTransaction({
        ...form,
        amount: Number(form.amount),
      })
      setStatus({ message: 'Transaction saved!', type: 'success' })
      setForm(defaultForm(today))
      setTimeout(() => navigate('/history'), 700)
    } catch (err) {
      setStatus({ message: err.message || 'Unable to save transaction.', type: 'error' })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Add transaction</h2>
        <p className="text-sm text-slate-500">Add a new income or expense entry.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl bg-white p-4 shadow-soft"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-600">
            Date
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500/30"
            />
          </label>

          <label className="space-y-1 text-sm text-slate-600">
            Type
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500/30"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-600">
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500/30"
            >
              <option value="home">Home</option>
              <option value="vehicle">Vehicle</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="space-y-1 text-sm text-slate-600">
            Amount
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500/30"
            />
          </label>
        </div>

        <label className="space-y-1 text-sm text-slate-600">
          Item / Description
          <input
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="e.g., grocery, salary"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500/30"
          />
        </label>

        {status.message && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              status.type === 'error'
                ? 'bg-rose-50 text-rose-700'
                : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Save transaction
        </button>
      </form>
    </div>
  )
}
