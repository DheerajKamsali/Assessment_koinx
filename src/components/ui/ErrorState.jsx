import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-rose-900/40 bg-rose-500/5 p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-900/40 bg-rose-500/10 text-rose-300">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Unable to load dashboard</h3>
          <p className="mt-2 text-sm text-slate-400">{message}</p>
        </div>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}