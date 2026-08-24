// "Client Experiences" (formerly "What clients say") — renders reviews
// and lets a visitor submit a new one.
//
// Source: the backoffice's live feed, backoffice/testimonials-feed.php
// — a public, no-login JSON endpoint that returns only APPROVED,
// consented testimonials. Every admin approval on
// backoffice/feedback-management.php is therefore visible here on the
// very next page load, with no static file to regenerate and no
// deploy step.
//
// assets/js/testimonials-data.js and assets/data/testimonials.json are
// SUPERSEDED by this live feed and are no longer loaded by index.html.
// They're kept in the repo (not deleted) as: (a) illustrative sample
// content, and (b) a source to hand-seed a couple of real testimonials
// into the `feedback` table via SQL if the site launches with zero
// approved reviews and an empty grid would look bad.
'use strict';

// Endpoint base is SiteConfig.backofficeBaseUrl (assets/js/config.js),
// loaded before this script — see that file's comment for why this is
// the ONE place the backoffice's location is configured. Read at call
// time (via the getters below), not cached at parse time, so a runtime
// change to SiteConfig.backofficeBaseUrl (e.g. from a test harness)
// takes effect without a page reload.
const Testimonials = {
  get FEED_URL() { return `${SiteConfig.backofficeBaseUrl.replace(/\/$/, '')}/testimonials-feed.php`; },
  get SUBMIT_URL() { return `${SiteConfig.backofficeBaseUrl.replace(/\/$/, '')}/testimonial-submit.php`; },
  get CSRF_URL() { return `${SiteConfig.backofficeBaseUrl.replace(/\/$/, '')}/csrf-token.php`; },
  VISIBLE_COUNT: 3,
  expanded: false,
  csrfToken: null,

  starString(rating) {
    const full = Math.max(0, Math.min(5, Math.round(rating || 0)));
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  },

  // "2026-03-14 10:22:00" (or any Date-parseable created_at) -> "March
  // 2026". Falls back to '' if the value is missing/unparseable so a
  // card never shows "Invalid Date".
  formatMonthYear(dateStr) {
    if (!dateStr) return '';
    const d = new Date(String(dateStr).replace(' ', 'T'));
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  },

  buildCard(r) {
    const card = document.createElement('div');
    card.className = 'testimonial-card blueprint';
    card.innerHTML = '<i class="corner tl" aria-hidden="true"></i><i class="corner tr" aria-hidden="true"></i><i class="corner bl" aria-hidden="true"></i><i class="corner br" aria-hidden="true"></i>';

    const stars = document.createElement('div');
    stars.className = 'testimonial-card__stars';
    stars.setAttribute('aria-label', (r.rating || 0) + ' out of 5 stars');
    stars.textContent = this.starString(r.rating);

    const p = document.createElement('p');
    p.textContent = '"' + (r.comment || '') + '"';

    // Name + city + service used on their own line (the "source" line),
    // date on a second, quieter line — only fields the feed actually
    // returns (name, location, rating, comment, service_used, photo,
    // created_at — see backoffice/testimonials-feed.php).
    const source = document.createElement('div');
    source.className = 'testimonial-card__source';
    let sourceText = r.name || 'Client';
    if (r.location) sourceText += ' — ' + r.location;
    if (r.service_used) sourceText += ' · ' + r.service_used;
    source.textContent = sourceText;

    card.append(stars, p, source);

    const monthYear = this.formatMonthYear(r.created_at);
    if (monthYear) {
      const meta = document.createElement('div');
      meta.className = 'testimonial-card__meta';
      meta.textContent = monthYear;
      card.append(meta);
    }

    if (r.photo) {
      const img = document.createElement('img');
      img.src = r.photo;
      img.alt = '';
      img.loading = 'lazy';
      img.className = 'testimonial-card__photo';
      card.prepend(img);
    }

    return card;
  },

  // Summary header above the grid: total reviews + average rating,
  // derived entirely client-side from the already-fetched feed array
  // (no separate endpoint) — Part 7.
  renderSummary(reviews) {
    const el = document.getElementById('testimonialSummary');
    if (!el) return;
    const rated = reviews.filter((r) => typeof r.rating === 'number' && r.rating > 0);
    if (rated.length === 0) {
      el.hidden = true;
      el.replaceChildren();
      return;
    }
    const avg = rated.reduce((sum, r) => sum + r.rating, 0) / rated.length;
    const avgRounded = Math.round(avg * 10) / 10;

    const stars = document.createElement('span');
    stars.className = 'testimonial-summary__stars';
    stars.textContent = this.starString(avg);

    const avgEl = document.createElement('span');
    avgEl.className = 'testimonial-summary__avg';
    avgEl.textContent = avgRounded.toFixed(1);

    const countEl = document.createElement('span');
    countEl.className = 'testimonial-summary__count';
    countEl.textContent = reviews.length + (reviews.length === 1 ? ' review' : ' reviews');

    el.replaceChildren(stars, avgEl, countEl);
    el.hidden = false;
  },

  renderList(reviews) {
    const grid = document.getElementById('testimonialGrid');
    const moreBtn = document.getElementById('testimonialMore');
    if (!grid) return;

    this.reviews = reviews;
    this.renderSummary(reviews);
    const visible = this.expanded ? reviews : reviews.slice(0, this.VISIBLE_COUNT);
    grid.replaceChildren(...visible.map((r) => this.buildCard(r)));

    const remaining = reviews.length - this.VISIBLE_COUNT;
    if (moreBtn) {
      if (remaining <= 0) {
        moreBtn.hidden = true;
      } else {
        moreBtn.hidden = false;
        moreBtn.textContent = this.expanded ? 'Show fewer reviews' : 'Show ' + remaining + ' more reviews';
      }
    }
  },

  initShowMore() {
    const moreBtn = document.getElementById('testimonialMore');
    if (!moreBtn) return;
    moreBtn.addEventListener('click', () => {
      this.expanded = !this.expanded;
      this.renderList(this.reviews || []);
    });
  },

  async loadReviews() {
    try {
      // 'include' (not 'same-origin') — vfsoffice is a separate
      // origin from this site now; 'same-origin' would silently stop
      // sending the session cookie cross-origin, breaking the CSRF
      // round-trip in fetchCsrfToken()/submit below (this particular
      // call doesn't need the cookie itself, but matches the other two
      // for one consistent policy).
      const res = await fetch(this.FEED_URL, { credentials: 'include' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const reviews = await res.json();
      this.renderList(Array.isArray(reviews) ? reviews : []);
    } catch (err) {
      // Backoffice unreachable (e.g. opened as a local file, or the
      // API is down) — leave the grid empty rather than showing a
      // broken layout; the "Share your experience" form still works
      // independently of this fetch.
      this.renderList([]);
    }
  },

  initRatingInput() {
    const wrap = document.getElementById('reviewRatingInput');
    const hiddenField = document.getElementById('reviewRatingValue');
    if (!wrap || !hiddenField) return;

    const stars = Array.from(wrap.querySelectorAll('button'));

    const setRating = (value) => {
      hiddenField.value = String(value);
      stars.forEach((s) => {
        const active = Number(s.dataset.value) <= value;
        s.textContent = active ? '★' : '☆';
        s.setAttribute('aria-pressed', String(active));
      });
    };

    stars.forEach((s) => s.addEventListener('click', () => setRating(Number(s.dataset.value))));
    setRating(5);
  },

  // Fetches a fresh CSRF token from the backoffice before submit — see
  // backoffice/testimonial-submit.php's file header for why this
  // extra round trip is the chosen tradeoff over skipping CSRF.
  async fetchCsrfToken() {
    // 'include': must send the session cookie cross-origin so the token
    // minted here is still valid on the follow-up cross-origin POST below.
    const res = await fetch(this.CSRF_URL, { credentials: 'include' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return data.csrf_token;
  },

  initSubmitForm() {
    const form = document.getElementById('reviewForm');
    const hint = document.getElementById('reviewHint');
    if (!form) return;

    // Warm the CSRF token as soon as the form is revealed, so submit
    // isn't blocked on it — falls back to fetching at submit time if
    // this fails (e.g. it ran before the details panel opened).
    this.fetchCsrfToken().then((t) => { this.csrfToken = t; }).catch(() => {});
    const toggle = form.closest('.review-form-toggle');
    if (toggle) {
      toggle.addEventListener('toggle', () => {
        if (toggle.open && !this.csrfToken) {
          this.fetchCsrfToken().then((t) => { this.csrfToken = t; }).catch(() => {});
        }
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = form.elements.reviewerName.value.trim();
      const comment = form.elements.reviewComment.value.trim();
      const rating = form.elements.rating.value;
      const consent = form.elements.consent.checked;

      if (!name || !comment) {
        hint.textContent = 'Name and a short comment are both needed.';
        hint.classList.add('is-error');
        return;
      }
      if (!consent) {
        hint.textContent = 'Please confirm consent to publish your testimonial.';
        hint.classList.add('is-error');
        return;
      }

      const submitBtn = form.querySelector('button[type=submit]');
      submitBtn.disabled = true;
      hint.textContent = 'Sending for review…';
      hint.classList.remove('is-error');

      try {
        if (!this.csrfToken) {
          this.csrfToken = await this.fetchCsrfToken();
        }

        const body = new FormData();
        body.append('csrf_token', this.csrfToken);
        body.append('customer_name', name);
        body.append('location', form.elements.location.value.trim());
        body.append('rating', rating);
        body.append('comments', comment);
        body.append('service_used', form.elements.serviceUsed.value);
        body.append('consent', consent ? '1' : '0');
        body.append('website_url', form.elements.website_url.value); // honeypot
        if (form.elements.reviewPhoto && form.elements.reviewPhoto.files[0]) {
          body.append('photo', form.elements.reviewPhoto.files[0]);
        }

        const res = await fetch(this.SUBMIT_URL, {
          method: 'POST',
          credentials: 'include', // must carry the session cookie from fetchCsrfToken() above, cross-origin
          body
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          throw new Error(data.error || ('HTTP ' + res.status));
        }
        hint.textContent = 'Thank you — your testimonial is pending review. Approved reviews appear on this page automatically.';
        form.reset();
        this.csrfToken = null; // token is one-shot-ish per session; safe to refetch next time
      } catch (err) {
        hint.textContent = (err && err.message) ? err.message : 'Something went wrong sending that — please try again shortly.';
        hint.classList.add('is-error');
      } finally {
        submitBtn.disabled = false;
      }
    });
  },

  init() {
    this.loadReviews();
    this.initShowMore();
    this.initRatingInput();
    this.initSubmitForm();
  }
};
