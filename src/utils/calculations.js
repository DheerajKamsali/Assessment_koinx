export function calculateNetGain(profits = 0, losses = 0) {
  return Number((profits - losses).toFixed(2));
}

export function calculateRealisedGains(gains = {}) {
  const stcgProfits = gains.stcgProfits ?? 0;
  const stcgLosses = gains.stcgLosses ?? 0;
  const ltcgProfits = gains.ltcgProfits ?? 0;
  const ltcgLosses = gains.ltcgLosses ?? 0;

  const netStcg = calculateNetGain(stcgProfits, stcgLosses);
  const netLtcg = calculateNetGain(ltcgProfits, ltcgLosses);

  return {
    stcgProfits,
    stcgLosses,
    ltcgProfits,
    ltcgLosses,
    netStcg,
    netLtcg,
    realisedCapitalGains: Number((netStcg + netLtcg).toFixed(2)),
  };
}

export function calculateHarvestedGains(holdings = []) {
  return holdings.reduce(
    (totals, holding) => {
      const stcg = Number(holding.stcg ?? 0);
      const ltcg = Number(holding.ltcg ?? 0);

      if (stcg >= 0) {
        totals.stcgProfits += stcg;
      } else {
        totals.stcgLosses += Math.abs(stcg);
      }

      if (ltcg >= 0) {
        totals.ltcgProfits += ltcg;
      } else {
        totals.ltcgLosses += Math.abs(ltcg);
      }

      return totals;
    },
    {
      stcgProfits: 0,
      stcgLosses: 0,
      ltcgProfits: 0,
      ltcgLosses: 0,
    },
  );
}

export function formatCurrency(value = 0) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}