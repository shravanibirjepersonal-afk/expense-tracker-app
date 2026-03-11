import { NavLink } from 'react-router-dom'
import { FaChartPie, FaPlusCircle, FaList } from 'react-icons/fa'

const navItems = [
  { to: '/', label: 'Dashboard', icon: FaChartPie },
  { to: '/add', label: 'Add', icon: FaPlusCircle },
  { to: '/history', label: 'History', icon: FaList },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/90 backdrop-blur" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="max-w-lg mx-auto flex justify-between px-6 py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-xs font-semibold tracking-wide transition-colors ${
                  isActive
                    ? 'text-brand-600'
                    : 'text-slate-400 hover:text-slate-700'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
