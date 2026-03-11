import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import AddTransactionPage from './pages/AddTransactionPage'
import HistoryPage from './pages/HistoryPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/add' element={<AddTransactionPage />} />
        <Route path='/history' element={<HistoryPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Layout>
  )
}
