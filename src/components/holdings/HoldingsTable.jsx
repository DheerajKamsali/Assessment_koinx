import { ChevronDown, ChevronUp } from 'lucide-react';
import HoldingRow from './HoldingRow';

export default function HoldingsTable({
  holdings,
  selectedIds,
  onToggleHolding,
  onToggleAll,
  allSelected,
  someSelected,
  viewAll,
  onToggleViewAll,
}) {
  const masterCheckboxRef = (node) => {
    if (node) {
      node.indeterminate = someSelected && !allSelected;
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-glow backdrop-blur-xl">
      <div className="flex flex-col gap-3 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Holdings</h3>
          <p className="text-sm text-slate-400">Select rows to preview post-harvest capital gains.</p>
        </div>
        <button
          type="button"
          onClick={onToggleViewAll}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-500/50 hover:text-white"
        >
          {viewAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {viewAll ? 'Show Less' : 'View All'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-xl">
            <tr className="text-xs uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-4">
                <input
                  ref={masterCheckboxRef}
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
                  checked={allSelected}
                  onChange={onToggleAll}
                />
              </th>
              <th className="px-4 py-4">Asset</th>
              <th className="px-4 py-4">Holdings</th>
              <th className="px-4 py-4">Avg Buy Price</th>
              <th className="px-4 py-4">Current Price</th>
              <th className="px-4 py-4">STCG</th>
              <th className="px-4 py-4">LTCG</th>
              <th className="px-4 py-4">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <HoldingRow
                key={holding.id}
                holding={holding}
                selected={selectedIds.has(holding.id)}
                onToggle={onToggleHolding}
                amountToSell={selectedIds.has(holding.id) ? holding.holdings : '-'}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}