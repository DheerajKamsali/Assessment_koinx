import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';

export default function HoldingRow({ holding, selected, onToggle, amountToSell }) {
  const profitTone = holding.stcg >= 0 ? 'text-green-400' : 'text-red-400';
  const ltcgTone = holding.ltcg >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-slate-800/80 transition hover:bg-slate-800/40"
    >
      <td className="px-4 py-4 align-middle">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
          checked={selected}
          onChange={() => onToggle(holding)}
        />
      </td>
      <td className="px-4 py-4 align-middle">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-lg text-blue-300">
            {holding.logo}
          </div>
          <div>
            <div className="font-semibold text-white">{holding.symbol}</div>
            <div className="text-xs text-slate-400">{holding.name}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 align-middle text-slate-300">{holding.holdings}</td>
      <td className="px-4 py-4 align-middle text-slate-300">{formatCurrency(holding.avgBuyPrice)}</td>
      <td className="px-4 py-4 align-middle text-slate-300">{formatCurrency(holding.currentPrice)}</td>
      <td className={`px-4 py-4 align-middle font-semibold ${profitTone}`}>{formatCurrency(holding.stcg)}</td>
      <td className={`px-4 py-4 align-middle font-semibold ${ltcgTone}`}>{formatCurrency(holding.ltcg)}</td>
      <td className="px-4 py-4 align-middle font-semibold text-blue-300">{amountToSell}</td>
    </motion.tr>
  );
}