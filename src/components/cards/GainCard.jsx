import { motion } from 'framer-motion';

export default function GainCard({ title, value, subtitle, icon: Icon, tone = 'blue' }) {
  const toneClasses = {
    blue: 'from-blue-500/20 via-slate-900 to-slate-950 text-blue-100',
    green: 'from-emerald-500/20 via-slate-900 to-slate-950 text-emerald-100',
    red: 'from-rose-500/20 via-slate-900 to-slate-950 text-rose-100',
    neutral: 'from-slate-700/20 via-slate-900 to-slate-950 text-slate-100',
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`rounded-3xl border border-slate-800 bg-gradient-to-br p-5 shadow-glow backdrop-blur-xl ${toneClasses[tone]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{title}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{value}</h3>
          {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
        </div>
        {Icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 text-blue-300">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}