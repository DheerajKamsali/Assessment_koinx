import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Coins, LineChart, Shield, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { fetchCapitalGains, fetchHoldings } from '../api/mockApi';
import { calculateHarvestedGains, calculateRealisedGains, formatCurrency } from '../utils/calculations';
import GainCard from '../components/cards/GainCard';
import SummaryRow from '../components/cards/SummaryRow';
import SearchBar from '../components/ui/SearchBar';
import SortDropdown from '../components/ui/SortDropdown';
import Loader from '../components/ui/Loader';
import ErrorState from '../components/ui/ErrorState';
import HoldingsTable from '../components/holdings/HoldingsTable';

const taxRate = 0.3;

const sortOptions = [
  { value: 'stcg-desc', label: 'STCG: High to Low' },
  { value: 'ltcg-desc', label: 'LTCG: High to Low' },
  { value: 'holdings-desc', label: 'Holdings: High to Low' },
  { value: 'currentPrice-desc', label: 'Current Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

function cloneHoldings(holdings) {
  return holdings.map((holding) => ({ ...holding }));
}

function sortHoldings(holdings, sortBy) {
  const cloned = cloneHoldings(holdings);

  return cloned.sort((left, right) => {
    switch (sortBy) {
      case 'ltcg-desc':
        return right.ltcg - left.ltcg;
      case 'holdings-desc':
        return right.holdings - left.holdings;
      case 'currentPrice-desc':
        return right.currentPrice - left.currentPrice;
      case 'name-asc':
        return left.name.localeCompare(right.name);
      case 'stcg-desc':
      default:
        return right.stcg - left.stcg;
    }
  });
}

export default function DashboardPage() {
  const [capitalGains, setCapitalGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stcg-desc');
  const [viewAll, setViewAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const loadDashboard = async () => {
    setLoading(true);
    setError('');

    try {
      const [capitalGainsResponse, holdingsResponse] = await Promise.all([
        fetchCapitalGains(),
        fetchHoldings(),
      ]);

      setCapitalGains(capitalGainsResponse);
      setHoldings(holdingsResponse);
    } catch (loadingError) {
      setError(loadingError.message || 'Something went wrong while loading holdings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const preTotals = useMemo(() => {
    if (!capitalGains) {
      return calculateRealisedGains();
    }

    return calculateRealisedGains(capitalGains);
  }, [capitalGains]);

  const filteredHoldings = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const sorted = sortHoldings(holdings, sortBy);

    if (!normalizedSearch) {
      return sorted;
    }

    return sorted.filter((holding) => {
      const text = `${holding.symbol} ${holding.name}`.toLowerCase();
      return text.includes(normalizedSearch);
    });
  }, [holdings, searchTerm, sortBy]);

  const visibleHoldings = useMemo(
    () => (viewAll ? filteredHoldings : filteredHoldings.slice(0, 4)),
    [filteredHoldings, viewAll],
  );

  const selectedHoldings = useMemo(
    () => filteredHoldings.filter((holding) => selectedIds.has(holding.id)),
    [filteredHoldings, selectedIds],
  );

  const harvestedGains = useMemo(
    () => calculateHarvestedGains(selectedHoldings),
    [selectedHoldings],
  );

  const postTotals = useMemo(
    () =>
      calculateRealisedGains({
        stcgProfits: preTotals.stcgProfits + harvestedGains.stcgProfits,
        stcgLosses: preTotals.stcgLosses + harvestedGains.stcgLosses,
        ltcgProfits: preTotals.ltcgProfits + harvestedGains.ltcgProfits,
        ltcgLosses: preTotals.ltcgLosses + harvestedGains.ltcgLosses,
      }),
    [harvestedGains, preTotals],
  );

  const savings = useMemo(() => {
    const taxBefore = preTotals.realisedCapitalGains * taxRate;
    const taxAfter = postTotals.realisedCapitalGains * taxRate;
    return Number((taxBefore - taxAfter).toFixed(2));
  }, [postTotals.realisedCapitalGains, preTotals.realisedCapitalGains]);

  const allVisibleSelected = visibleHoldings.length > 0 && visibleHoldings.every((holding) => selectedIds.has(holding.id));
  const someVisibleSelected = visibleHoldings.some((holding) => selectedIds.has(holding.id));

  const toggleHolding = (holdingToToggle) => {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (next.has(holdingToToggle.id)) {
        next.delete(holdingToToggle.id);
      } else {
        next.add(holdingToToggle.id);
      }

      return next;
    });
  };

  const toggleAllVisible = () => {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (allVisibleSelected) {
        visibleHoldings.forEach((holding) => next.delete(holding.id));
      } else {
        visibleHoldings.forEach((holding) => next.add(holding.id));
      }

      return next;
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ErrorState message={error} onRetry={loadDashboard} />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.10),_transparent_24%),linear-gradient(180deg,_rgba(15,23,42,0.6),_rgba(2,6,23,1))]" />
      <div className="absolute inset-0 bg-radial-dots bg-[length:22px_22px] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-8 flex flex-col gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/60 p-6 shadow-glow backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Tax Loss Harvesting Dashboard
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Modern portfolio harvesting for crypto holdings.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Track gains, harvest losses, and preview the tax impact with a responsive fintech-style dashboard.
              </p>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:min-w-[320px]">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Shield className="h-4 w-4 text-blue-400" />
                Tax rate
              </div>
              <div className="mt-2 text-lg font-semibold text-white">{Math.round(taxRate * 100)}%</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Coins className="h-4 w-4 text-emerald-400" />
                Selected holdings
              </div>
              <div className="mt-2 text-lg font-semibold text-white">{selectedHoldings.length}</div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <GainCard
            title="Pre Harvesting"
            value={formatCurrency(preTotals.realisedCapitalGains)}
            subtitle="Initial capital gains from API"
            icon={TrendingUp}
            tone="blue"
          />
          <GainCard
            title="After Harvesting"
            value={formatCurrency(postTotals.realisedCapitalGains)}
            subtitle="Updates as holdings are selected"
            icon={TrendingDown}
            tone="neutral"
          />
          <GainCard
            title="Net STCG"
            value={formatCurrency(postTotals.netStcg)}
            subtitle="Profits minus losses"
            icon={LineChart}
            tone={postTotals.netStcg >= 0 ? 'green' : 'red'}
          />
          <GainCard
            title="Net LTCG"
            value={formatCurrency(postTotals.netLtcg)}
            subtitle="Profits minus losses"
            icon={LineChart}
            tone={postTotals.netLtcg >= 0 ? 'green' : 'red'}
          />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-glow backdrop-blur-xl">
            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <SortDropdown value={sortBy} onChange={setSortBy} options={sortOptions} />
            </div>

            <div className="mt-4">
              <HoldingsTable
                holdings={visibleHoldings}
                selectedIds={selectedIds}
                onToggleHolding={toggleHolding}
                onToggleAll={toggleAllVisible}
                allSelected={allVisibleSelected}
                someSelected={someVisibleSelected}
                viewAll={viewAll}
                onToggleViewAll={() => setViewAll((current) => !current)}
              />
            </div>

            <AnimatePresence>
              {!visibleHoldings.length ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center"
                >
                  <p className="text-lg font-semibold text-white">No holdings found</p>
                  <p className="mt-2 text-sm text-slate-400">Try a different symbol or asset name.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-glow backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Tax savings</p>
                  <h2 className="text-lg font-semibold text-white">Harvest impact</h2>
                </div>
              </div>

              <SummaryRow label="Net STCG" value={formatCurrency(postTotals.netStcg)} valueClassName={postTotals.netStcg >= 0 ? 'text-green-400' : 'text-red-400'} />
              <SummaryRow label="Net LTCG" value={formatCurrency(postTotals.netLtcg)} valueClassName={postTotals.netLtcg >= 0 ? 'text-green-400' : 'text-red-400'} />
              <SummaryRow label="Realised Capital Gains" value={formatCurrency(postTotals.realisedCapitalGains)} valueClassName="text-blue-300" />
              <SummaryRow label="Tax before" value={formatCurrency(preTotals.realisedCapitalGains * taxRate)} valueClassName="text-slate-200" />
              <SummaryRow label="Tax after" value={formatCurrency(postTotals.realisedCapitalGains * taxRate)} valueClassName="text-slate-200" />

              {savings > 0 ? (
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  You&apos;re going to save {formatCurrency(savings)}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-400">
                  Select loss-making holdings to unlock tax savings.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-glow backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/80 text-blue-300">
                  <LineChart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Harvested selection</p>
                  <h2 className="text-lg font-semibold text-white">Selected totals</h2>
                </div>
              </div>

              <SummaryRow label="STCG profits" value={formatCurrency(harvestedGains.stcgProfits)} valueClassName="text-green-400" />
              <SummaryRow label="STCG losses" value={formatCurrency(harvestedGains.stcgLosses)} valueClassName="text-red-400" />
              <SummaryRow label="LTCG profits" value={formatCurrency(harvestedGains.ltcgProfits)} valueClassName="text-green-400" />
              <SummaryRow label="LTCG losses" value={formatCurrency(harvestedGains.ltcgLosses)} valueClassName="text-red-400" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}