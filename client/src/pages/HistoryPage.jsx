import { useEffect, useMemo, useState } from 'react'
import { useTransactions } from '../context/TransactionsContext'

function TransactionRow({ transaction }) {
  const isIncome = transaction.type === 'income'
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-soft">
      <div>
        <p className="font-semibold text-slate-800">{transaction.item}</p>
        <p className="text-xs text-slate-500">{transaction.category}</p>
        <p className="text-xs text-slate-400">{new Date(transaction.date).toLocaleString()}</p>
      </div>
      <p className={`font-semibold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isIncome ? '+' : '-'}₹{Number(transaction.amount).toFixed(2)}
      </p>
    </div>
  )
}

export default function HistoryPage() {
  const { transactions, loading, error, loadTransactions } = useTransactions()
  const [filterDate, setFilterDate] = useState(() => new Date().toISOString().slice(0, 10))

  useEffect(() => {
    loadTransactions(filterDate)
  }, [filterDate, loadTransactions])

  const summary = useMemo(() => {
    const totals = { income: 0, expense: 0 }
    transactions.forEach((t) => {
      const amount = Number(t.amount) || 0
      if (t.type === 'income') totals.income += amount
      else totals.expense += amount
    })
    return totals
  }, [transactions])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Transaction history</h2>
            <p className="text-sm text-slate-500">Filter, review, and export your daily transactions.</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Totals</p>
            <p className="text-sm font-semibold text-slate-800">
              +₹{summary.income.toFixed(2)} / -₹{summary.expense.toFixed(2)}
            </p>
          </div>
        </div>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          Filter by date
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500/30"
          />
        </label>
      </div>

      {loading && (
        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Loading…</div>
      )}
      {error && (
        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      {!loading && transactions.length === 0 && (
        <div className="rounded-2xl bg-white px-4 py-6 text-center text-sm text-slate-500 shadow-soft">
          No transactions found for this date.
        </div>
      )}

      <div className="space-y-3">
        {transactions.map((tx) => (
          <TransactionRow key={tx._id || tx.id || `${tx.date}-${tx.item}`} transaction={tx} />
        ))}
      </div>
    </div>
  )
}
