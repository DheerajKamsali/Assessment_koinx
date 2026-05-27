export default function Loader() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`card-skeleton-${index}`}
            className="h-32 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70"
          />
        ))}
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
        <div className="h-14 animate-pulse border-b border-slate-800 bg-slate-800/70" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={`row-skeleton-${index}`} className="h-20 animate-pulse border-b border-slate-800/70" />
        ))}
      </div>
    </div>
  );
}