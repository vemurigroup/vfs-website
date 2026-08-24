// Hero SIP widget + the four Tools-section calculators (SIP+top-up, SWP,
// FD, Inflation). Same defaults/behavior as the original Component's
// state (defaultSip: 2000, returnRate: 12, sipYears: 15).
'use strict';

const Calculators = {
  HERO_RATE: 12,

  initHero() {
    const amountInput = document.getElementById('heroAmount');
    const yearsInput = document.getElementById('heroYears');
    if (!amountInput || !yearsInput) return;

    const render = () => {
      const amount = parseInt(amountInput.value, 10);
      const years = parseInt(yearsInput.value, 10);
      const value = Finance.sipFV(amount, this.HERO_RATE, years);
      const invested = amount * years * 12;
      const ratio = value > 0 ? Math.max(8, (invested / value) * 100) : 8;

      document.getElementById('heroAmountOut').textContent = Format.grp(amount);
      document.getElementById('heroYearsOut').textContent = years + ' years';
      document.getElementById('heroBarInvested').style.height = ratio.toFixed(1) + '%';
      document.getElementById('heroBarValue').style.height = '100%';
      document.getElementById('heroInvested').textContent = Format.fmt(invested);
      document.getElementById('heroValue').textContent = Format.fmt(value);
      document.getElementById('heroGain').textContent = Format.fmt(value - invested);
    };

    amountInput.addEventListener('input', render);
    yearsInput.addEventListener('input', render);
    render();
  },

  initTabs() {
    const tabs = Array.from(document.querySelectorAll('[data-calc-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-calc-panel]'));
    if (!tabs.length) return;

    const select = (id) => {
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.calcTab === id)));
      panels.forEach((p) => p.classList.toggle('is-active', p.dataset.calcPanel === id));
    };

    tabs.forEach((t) => t.addEventListener('click', () => select(t.dataset.calcTab)));
    select(tabs[0].dataset.calcTab);
  },

  initSip() {
    const ids = ['calcSipAmt', 'calcSipRate', 'calcSipYears', 'calcSipTop'];
    const els = ids.map((id) => document.getElementById(id));
    if (els.some((el) => !el)) return;
    const [amtEl, rateEl, yearsEl, topEl] = els;

    const render = () => {
      const amt = Format.num(amtEl.value, 0);
      const rate = Format.num(rateEl.value, 0);
      const years = Format.num(yearsEl.value, 0);
      const top = Format.num(topEl.value, 0);
      const { fv, inv, last } = Finance.sipTopUp(amt, rate, years, top);

      document.getElementById('calcSipOut').textContent = Format.fmt(fv);
      document.getElementById('calcSipInv').textContent = Format.fmt(inv);
      document.getElementById('calcSipGain').textContent = Format.fmt(fv - inv);
      document.getElementById('calcSipLast').textContent = Format.grp(last);
    };

    els.forEach((el) => el.addEventListener('input', render));
    render();
  },

  initSwp() {
    const ids = ['calcSwpP', 'calcSwpR', 'calcSwpY', 'calcSwpW'];
    const els = ids.map((id) => document.getElementById(id));
    if (els.some((el) => !el)) return;
    const [pEl, rEl, yEl, wEl] = els;

    const render = () => {
      const p = Format.num(pEl.value, 0);
      const r = Format.num(rEl.value, 0);
      const y = Format.num(yEl.value, 0);
      const w = Format.num(wEl.value, 0);
      const { end, totalWithdrawn } = Finance.swpRemaining(p, r, y, w);

      document.getElementById('calcSwpOut').textContent = Format.fmt(Math.max(0, end));
      document.getElementById('calcSwpTotal').textContent = Format.fmt(totalWithdrawn);
      document.getElementById('calcSwpVerdict').textContent = end > 0 ? 'Corpus survives' : 'Runs dry early';
    };

    els.forEach((el) => el.addEventListener('input', render));
    render();
  },

  initFd() {
    const ids = ['calcFdP', 'calcFdR', 'calcFdY', 'calcFdM'];
    const els = ids.map((id) => document.getElementById(id));
    if (els.some((el) => !el)) return;
    const [pEl, rEl, yEl, mEl] = els;

    const render = () => {
      const p = Format.num(pEl.value, 0);
      const r = Format.num(rEl.value, 0);
      const y = Format.num(yEl.value, 0);
      const m = parseInt(mEl.value, 10) || 1;
      const { amount, effectiveYield } = Finance.fdMaturity(p, r, y, m);

      document.getElementById('calcFdOut').textContent = Format.fmt(amount);
      document.getElementById('calcFdInt').textContent = Format.fmt(amount - p);
      document.getElementById('calcFdYield').textContent = effectiveYield;
    };

    els.forEach((el) => el.addEventListener('input', render));
    mEl.addEventListener('change', render);
    render();
  },

  initInflation() {
    const ids = ['calcInfC', 'calcInfR', 'calcInfY'];
    const els = ids.map((id) => document.getElementById(id));
    if (els.some((el) => !el)) return;
    const [cEl, rEl, yEl] = els;

    const render = () => {
      const c = Format.num(cEl.value, 0);
      const r = Format.num(rEl.value, 0);
      const y = Format.num(yEl.value, 0);
      const out = Finance.inflatedCost(c, r, y);
      const power = out > 0 ? ((c / out) * 100).toFixed(0) : '0';

      document.getElementById('calcInfOut').textContent = Format.fmt(out);
      document.getElementById('calcInfDelta').textContent = Format.fmt(out - c);
      document.getElementById('calcInfPower').textContent = power;
    };

    els.forEach((el) => el.addEventListener('input', render));
    render();
  },

  initFilters() {
    const buttons = Array.from(document.querySelectorAll('[data-filter]'));
    const rows = Array.from(document.querySelectorAll('[data-cats]'));
    if (!buttons.length) return;

    const apply = (filter) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
      rows.forEach((row) => {
        const cats = row.dataset.cats.split(' ');
        row.hidden = !(filter === 'all' || cats.includes(filter));
      });
    };

    buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));
    apply('all');
  },

  init() {
    this.initHero();
    this.initTabs();
    this.initSip();
    this.initSwp();
    this.initFd();
    this.initInflation();
    this.initFilters();
  }
};
