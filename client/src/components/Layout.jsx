import Navbar from './Navbar'
import BottomNav from './BottomNav'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-white text-slate-900">
      <Navbar />
      <main className="pt-4 pb-32 max-w-lg mx-auto px-4">{children}</main>
      <BottomNav />
    </div>
  )
}
