// Calculator math. Ported 1:1 from the original Component class's
// renderVals()/sipFV()/sipTopUp() (index.html) — same formulas, same
// rounding, so outputs stay numerically identical to the design-tool build.
'use strict';

const Finance = {
  /** Future value of a flat monthly SIP. */
  sipFV(p, ratePct, years) {
    const i = ratePct / 1200;
    const n = Math.round(years * 12);
    if (i === 0) return p * n;
    return p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  },

  /** SIP with an annual top-up added to the monthly amount each year. */
  sipTopUp(p, ratePct, years, top) {
    const i = ratePct / 1200;
    let fv = 0, m = p, inv = 0;
    for (let y = 0; y < Math.round(years); y++) {
      for (let k = 0; k < 12; k++) {
        fv = (fv + m) * (1 + i);
        inv += m;
      }
      m += top;
    }
    return { fv, inv, last: m - top };
  },

  /** Corpus remaining after a fixed monthly withdrawal (SWP). */
  swpRemaining(corpus, ratePct, years, withdrawal) {
    const i = ratePct / 1200;
    const n = Math.round(years * 12);
    const end = i === 0
      ? corpus - withdrawal * n
      : corpus * Math.pow(1 + i, n) - withdrawal * ((Math.pow(1 + i, n) - 1) / i);
    return { end, totalWithdrawn: withdrawal * n };
  },

  /** Fixed-deposit maturity value with selectable compounding frequency. */
  fdMaturity(principal, ratePct, years, compoundsPerYear) {
    const m = compoundsPerYear || 1;
    const amount = principal * Math.pow(1 + ratePct / (100 * m), m * years);
    const effectiveYield = principal > 0 && years > 0
      ? ((Math.pow(amount / principal, 1 / years) - 1) * 100).toFixed(2)
      : '0.00';
    return { amount, effectiveYield };
  },

  /** Future cost of today's expense at a given inflation rate. */
  inflatedCost(costToday, ratePct, years) {
    return costToday * Math.pow(1 + ratePct / 100, years);
  }
};
