import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ExpensePieChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: ['#16a34a', '#dc2626', '#2563eb', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-4">
      <h3 className="text-sm font-semibold text-slate-600 mb-3">Expenses by Category</h3>
      <div className="w-full h-56">
        <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  )
}
