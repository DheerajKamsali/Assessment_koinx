export default function SortDropdown({ value, onChange, options }) {
  return (
    <label className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-300">
      <span className="text-sm text-slate-500">Sort</span>
      <select
        className="w-full bg-transparent text-sm text-slate-100 outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-950 text-slate-100">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}