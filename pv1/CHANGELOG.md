# Changelog

This file starts now — it does not retroactively reconstruct the
project's full prior history. From this point forward, notable changes
go here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/);
dates are when the change was made, not a formal release-tag scheme
(no semver/CI process exists yet — see `ARCHITECTURE.md`'s gap list).

## 2026-08-08

### Added — data-protection links and consent capture
- Footer now links to the backoffice's **Privacy Policy** and
  **Compliance** pages (`privacy-policy.php`/`compliance.php`, via the
  existing `data-cfg="backoffice-link"` mechanism — no hardcoded URL).
- The "Request a call back" form (`#callbackForm`) gained a required
  consent checkbox, validated in `assets/js/contact-form.js` before
  submission, linked to the Privacy Policy.
- The existing "Share your experience" review form's consent checkbox
  was already present and unchanged.

See `vfsoffice/CHANGELOG.md`'s matching 2026-08-08 entry for the
backoffice-side half of this work (the pages themselves, self-delete,
breach-response documentation).

## 2026-08-05 (later)

### Changed — backoffice moved to a separate project
`backoffice/` (the PHP + MySQL back-office app) moved out of this repo
entirely, to the standalone `vfsoffice` project (separate Git repo).
This repo now contains only the static public marketing site.

- `SiteConfig.backofficeBaseUrl` (`assets/js/config.js`) changed from a
  relative sibling path (`'backoffice'`) to an absolute cross-origin URL.
- `assets/js/testimonials.js`'s three `fetch()` calls changed
  `credentials: 'same-origin'` → `'include'` — required for the session
  cookie (and therefore the CSRF round-trip) to survive the now-genuinely-
  cross-origin request to vfsoffice.
- `DEPLOYMENT.md`, `README.md` rewritten to describe two independently
  deployable projects instead of one combined repo; the old in-repo
  backoffice deploy steps (Part B) now just point at
  `vfsoffice/DEPLOYMENT.md`.
- `scripts/production-smoke-test.sh` now takes an optional second
  argument (the backoffice URL) instead of assuming `$BASE_URL/backoffice/`;
  also added a real CORS check (confirms the public site's origin is
  actually in vfsoffice's `cors_allowed_origins`, not just that the
  backoffice endpoints respond) and fixed a pre-existing bug where the
  CSRF-token check looked for the substring `"token"`, which
  `{"csrf_token":...}` never actually contains.

### Fixed
- Deleted a stray `backup_vfs_backoffice_*.sql` file found sitting in the
  local test server's web root (not in git, not a real deployment — but
  the same class of risk as the credential CSVs removed earlier).

## 2026-08-05

### Fixed
- **Password reset always showed "invalid or expired" instantly.** Root
  cause: the reset-token expiry was computed on PHP's clock (`time()`)
  but checked against MySQL's own `NOW()`, and the two disagreed by
  several hours in this environment (PHP `date.timezone=UTC` vs MySQL
  `time_zone=SYSTEM`) — every token was expired the moment it was
  created. Fixed by computing the expiry entirely on MySQL's side
  (`NOW() + INTERVAL`) instead of mixing clocks. Same bug, same fix,
  applied to the rate limiter's cutoff window.
- **"Print Report" / "Share Report" silently did nothing, everywhere in
  the app.** `report-print.js` is a back-office-local asset
  (`backoffice/assets/js/`), but all 7 pages that load it
  (`calculators.php`, `npscalc.php`, `finplanner.php`,
  `adv-finplanner.php`, `reports-center.php`, `multisheet-view.php`,
  `audit-log.php`) referenced it with a `../` prefix meant for *shared*
  site-root assets, 404ing it. `printReport`/`shareReport` were
  therefore undefined; both buttons threw a silent `ReferenceError`.
- **One failing calculator could silently blank out every calculator
  after it in the list.** `calculators.php`'s initial
  "run every calculator once on load" loop had no per-calculator error
  isolation — one throw aborted the whole `forEach`. Now each
  calculator runs in its own try/catch (`runCalcSafely`) and logs its
  own failure instead of taking the rest down with it.
- request-access.php now sends the requester an acknowledgment email on
  submission — previously only the reviewing admin was notified;
  the requester heard nothing until (if) approved.

### Added
- Site-root `.htaccess` — previously did not exist at all, so the
  public marketing site served with no forced HTTPS and no security
  headers of any kind. Now sends `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, and HSTS, and force-redirects to
  HTTPS, matching what `backoffice/.htaccess` already did for the
  back-office half.
- HSTS header (`backoffice/.htaccess`) — the other security headers were
  already sent per-request from PHP (`sendSecurityHeaders()`), but HSTS
  has to apply at the web-server level to cover the redirect response
  itself.
- Plan/pricing summary + "first month free" messaging on
  `request-access.php`, sourced from `getAllPlans()` (same source
  `pricing.php` uses) so it can't drift into hand-typed copy.
- `index.html`: new Loans section (Home/Personal/Loan-against-property,
  routed through the lending partner) and new EPF Services section
  (e-nomination, withdrawal, UAN, KYC update, transfer, and more),
  each with its own nav entry, footer link, and callback-form goal
  option.
- `ARCHITECTURE.md` — current-state architecture doc (this repo had none
  before; `ENTERPRISE-REVIEW.html`'s Part 5 was a proposal, not a
  description of what exists).

### Security
- `backoffice/config.php` (real DB/SMTP/Razorpay credentials) added to
  `.gitignore` explicitly — it was untracked only because no one had
  run a broad `git add` yet, not because anything actually enforced
  that.
- Removed two loose Razorpay credential-export CSVs that had been saved
  at the repo root while debugging a dead API key — not tracked by git,
  but sitting in a location a manual zip-and-upload deploy could have
  picked up. `*.csv` added to `.gitignore` to catch a repeat of this.

### Changed
- Header nav order across `index.html` reordered twice this session to
  match the actual on-page section order (Home → About → Protect →
  Grow → Retire → Loans → EPF → MFD Platform → Tools ▾), including
  moving the About section itself to right after the hero.
