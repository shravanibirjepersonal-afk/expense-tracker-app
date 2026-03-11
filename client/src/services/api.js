const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const handleResponse = async (res) => {
  const payload = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(payload?.message || 'API request failed')
  }
  return payload
}

export async function fetchTransactions(date) {
  const url = date ? `${API_BASE}/transactions/${date}` : `${API_BASE}/transactions`
  const res = await fetch(url)
  return handleResponse(res)
}

export async function createTransaction(transaction) {
  const res = await fetch(`${API_BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  })
  return handleResponse(res)
}
