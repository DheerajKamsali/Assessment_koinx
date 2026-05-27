export default function SummaryRow({ label, value, valueClassName = 'text-white' }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-3 last:border-b-0 last:pb-0 first:pt-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`text-sm font-semibold ${valueClassName}`}>{value}</span>
    </div>
  );
}