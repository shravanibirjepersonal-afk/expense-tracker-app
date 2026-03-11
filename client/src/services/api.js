const API_BASE = import.meta.env.VITE_API_BASE_URL

if (!API_BASE) {
  throw new Error(
    'VITE_API_BASE_URL is not defined. Set it in your .env file (or deployment environment).',
  )
}

const handleResponse = async (res) => {
  const payload = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(payload?.message || 'API request failed')
  }
  return payload
}

export async function fetchTransactions(date) {
  const url = date
    ? `${API_BASE}/api/transactions/${date}`
    : `${API_BASE}/api/transactions`
  const res = await fetch(url)
  return handleResponse(res)
}

export async function createTransaction(transaction) {
  const res = await fetch(`${API_BASE}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  })
  return handleResponse(res)
}
