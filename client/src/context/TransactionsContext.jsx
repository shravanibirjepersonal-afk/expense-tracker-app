import { createContext, useCallback, useContext, useState } from 'react'
import { fetchTransactions, createTransaction } from '../services/api'

const TransactionsContext = createContext(null)

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadTransactions = useCallback(async (date) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTransactions(date)
      setTransactions(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'There was a problem fetching transactions.')
    } finally {
      setLoading(false)
    }
  }, [])

  const addTransaction = useCallback(async (transaction) => {
    setLoading(true)
    setError(null)
    try {
      const saved = await createTransaction(transaction)
      return saved
    } catch (err) {
      setError(err.message || 'Unable to save transaction.')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        loading,
        error,
        loadTransactions,
        addTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext)
  if (!ctx) {
    throw new Error('useTransactions must be used within TransactionsProvider')
  }
  return ctx
}
