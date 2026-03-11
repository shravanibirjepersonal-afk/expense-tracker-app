export default function StatCard({ label, value, colorClass, icon }) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-soft transition hover:shadow-md">
      <div>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className={`text-2xl font-semibold ${colorClass} mt-1`}>{value}</p>
      </div>
      {icon && (
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 shadow-sm ${
            colorClass === 'text-emerald-600'
              ? 'bg-emerald-50'
              : colorClass === 'text-rose-600'
              ? 'bg-rose-50'
              : 'bg-sky-50'
          }`}
        >
          <span className={`${colorClass} text-lg`}>{icon}</span>
        </div>
      )}
    </div>
  )
}
