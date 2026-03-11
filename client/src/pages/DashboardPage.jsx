import { useEffect, useMemo } from 'react'
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa'
import { useTransactions } from '../context/TransactionsContext'
import StatCard from '../components/StatCard'
import ExpensePieChart from '../components/ExpensePieChart'

const todayString = () => new Date().toISOString().slice(0, 10)

export default function DashboardPage() {
  const { transactions, loading, error, loadTransactions } = useTransactions()
  const today = useMemo(todayString, [])

  useEffect(() => {
    loadTransactions(today)
  }, [loadTransactions, today])

  const totals = useMemo(() => {
    const totals = { income: 0, expense: 0 }
    transactions.forEach((t) => {
      const amount = Number(t.amount) || 0
      if (t.type === 'income') totals.income += amount
      else totals.expense += amount
    })
    return totals
  }, [transactions])

  const balance = totals.income - totals.expense

  const expenseByCategory = useMemo(() => {
    const buckets = {
      Home: 0,
      Vehicle: 0,
      Other: 0,
    }
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const label =
          t.category?.toString().charAt(0).toUpperCase() +
          t.category?.toString().slice(1)
        if (label && buckets[label] !== undefined) {
          buckets[label] += Number(t.amount) || 0
        } else {
          buckets.Other += Number(t.amount) || 0
        }
      })
    return Object.entries(buckets).map(([label, value]) => ({ label, value }))
  }, [transactions])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Daily summary</p>
          <p className="text-xl font-semibold text-slate-900">{today}</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-500 shadow-soft">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Live update</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Income"
          value={`₹${totals.income.toFixed(2)}`}
          colorClass="text-emerald-600"
          icon={<FaArrowUp className="w-5 h-5" />}
        />
        <StatCard
          label="Expenses"
          value={`₹${totals.expense.toFixed(2)}`}
          colorClass="text-rose-600"
          icon={<FaArrowDown className="w-5 h-5" />}
        />
        <StatCard
          label="Balance"
          value={`₹${balance.toFixed(2)}`}
          colorClass="text-sky-600"
          icon={<FaWallet className="w-5 h-5" />}
        />
      </div>

      <ExpensePieChart data={expenseByCategory} />

      {error && (
        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {loading && (
        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Loading...</div>
      )}
    </div>
  )
}
