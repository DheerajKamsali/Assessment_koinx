import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search holdings' }) {
  return (
    <label className="flex w-full items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-300 transition focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20">
      <Search className="h-4 w-4 text-slate-500" />
      <input
        className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}