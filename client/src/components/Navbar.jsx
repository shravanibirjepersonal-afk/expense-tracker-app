import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { FaWallet } from 'react-icons/fa'

const titles = {
  '/': 'Dashboard',
  '/add': 'Add Transaction',
  '/history': 'History',
}

export default function Navbar() {
  const { pathname } = useLocation()
  const title = useMemo(() => titles[pathname] || 'Expense Tracker', [pathname])

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-500 text-white shadow">
          <FaWallet className="w-5 h-5" />
        </span>
        <div>
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">Track income & expenses</p>
        </div>
      </div>
    </header>
  )
}
