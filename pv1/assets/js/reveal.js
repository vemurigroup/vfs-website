// Scroll-reveal for [data-reveal] sections and the stat-band count-up.
// Ported from the original Component's componentDidMount()/runStats().
//
// Stat figures below (3 years, 300 clients, ₹3 Cr AUM) as confirmed by the
// business owner (clients updated 2026-08-10, was 200).
'use strict';

const Reveal = {
  STATS: { years: 3, clients: 300, aumCr: 3 },

  initSections() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-in', '');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach((el) => io.observe(el));
  },

  runStatCountUp() {
    const yearsEl = document.getElementById('statYears');
    const clientsEl = document.getElementById('statFamilies');
    const aumEl = document.getElementById('statAum');
    if (!yearsEl || !clientsEl || !aumEl) return;

    const dur = 1500;
    const t0 = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);

      yearsEl.textContent = Math.round(e * this.STATS.years) + '+';
      clientsEl.textContent = Math.round(e * this.STATS.clients) + '+';
      aumEl.textContent = '₹' + Math.round(e * this.STATS.aumCr) + '+ Cr';

      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  },

  initStats() {
    const band = document.getElementById('statBand');
    if (!band) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.runStatCountUp = () => {
        document.getElementById('statYears').textContent = this.STATS.years + '+';
        document.getElementById('statFamilies').textContent = this.STATS.clients + '+';
        document.getElementById('statAum').textContent = '₹' + this.STATS.aumCr + '+ Cr';
      };
    }

    const so = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        so.disconnect();
        this.runStatCountUp();
      }
    }, { threshold: 0.3 });

    so.observe(band);
  },

  init() {
    this.initSections();
    this.initStats();
  }
};
