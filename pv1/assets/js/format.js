// Number formatting helpers. Ported from the original Component class
// (index.html, old renderVals()) with identical behavior.
'use strict';

const Format = {
  /** ₹ compact form: 1.23 Cr / 4.56 L / plain grouped number. */
  fmt(n) {
    if (!isFinite(n)) return '0';
    const a = Math.abs(n);
    if (a >= 1e7) return (n / 1e7).toFixed(2) + ' Cr';
    if (a >= 1e5) return (n / 1e5).toFixed(2) + ' L';
    return Math.round(n).toLocaleString('en-IN');
  },

  /** Plain grouped integer, e.g. 12,345. */
  grp(n) {
    return Math.round(n).toLocaleString('en-IN');
  },

  /** Parse a form value to a finite number, falling back to a default. */
  num(v, d) {
    const n = parseFloat(v);
    return isFinite(n) ? n : d;
  }
};
