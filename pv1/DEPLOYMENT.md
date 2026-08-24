# Deployment Guide — Public Site (vfs-website)

This guide covers **this repo only** — the static public marketing site.
The back-office app (`vfsoffice`) is a **separate project with its
own deploy guide**: see `vfsoffice/DEPLOYMENT.md`. Deploy both if
you need the full experience (testimonials, MFD platform login) — this
repo alone is enough for a marketing-site-only deployment.

**Time estimate:** 15–20 minutes for this repo alone; add `vfsoffice`'s
own 45–60 minutes on top if deploying that too.

---

## 0. Understand what you're deploying (read this first)

`vfs-website` (this repo) and `vfsoffice` (separate repo) are two
independently deployable projects. `vfsoffice` is fully
self-contained (its own copy of every CSS/image/vendor-JS file under
`assets/`) and has zero filesystem dependency on this repo.

**This site links to and fetches live data from vfsoffice, though.**
The homepage's "What Clients Say" section and "Share your experience"
form (`assets/js/testimonials.js`) call three vfsoffice endpoints
cross-origin, and a few buttons/nav links point at its login and pricing
pages. Every one of these is driven by a **single config value**:
`SiteConfig.backofficeBaseUrl` in `assets/js/config.js` — set it to
vfsoffice's real deployed URL (e.g. `'https://backoffice.vemurigroup.in'`).
Nothing else in this site needs to change.

Two things vfsoffice's own config must agree with, or the
cross-origin calls silently fail in the browser (see that repo's
`config.php`):
- `cors_allowed_origins` must include this site's exact deployed origin.
- Both should share the same **registrable domain** (e.g. both under
  `*.vemurigroup.in`) — the session cookie behind the CSRF flow is
  `SameSite=Lax`, which allows cross-subdomain but not cross-domain.

So even though this repo is "just static files," **the testimonials
feature will not fully work until vfsoffice is deployed and
`backofficeBaseUrl`/`cors_allowed_origins` agree with each other** —
otherwise that part of the page silently shows nothing / fails to submit.
The "Request a call back" form is separate and does **not** need
vfsoffice at all — it posts to a Google Apps Script webhook instead
(see `google-apps-script/DEPLOY-STEPS.md`).

---

## Part A — Deploy the static public site

### A1. What to upload

```
index.html
partner-info.html
robots.txt
sitemap.xml
.htaccess   ← forces HTTPS and sends security headers (X-Frame-Options, HSTS, etc.)
             for the whole public site. Easy to miss since it's a dotfile — some
             FTP clients/File Managers hide these by default; check "show hidden files."
assets/
  css/  (tokens.css, base.css, components.css, responsive.css, utilities.css)
  js/   (config.js, format.js, finance.js, calculators.js, quiz.js, contact-form.js, testimonials.js, nav.js, reveal.js, main.js)
  images/ (vemurifin.png)
```

vfsoffice is a separate repo/upload — see its own `DEPLOYMENT.md`.
It can be deployed to a subfolder of this same hosting account (e.g.
`public_html/backoffice/`) or its own subdomain; either way it's a
separate upload, not part of this file list.

**Do not upload**: `DEPLOYMENT.md` (this file), `ENTERPRISE-REVIEW.html`,
`ARCHITECTURE.md`, `CHANGELOG.md`, `README.md`, `google-apps-script/`,
`pv1/`, `v2/`, `.claude/`, `.git/`, or anything from the old `support.js` /
`_ds/` design-tool export — none of these are meant to be publicly served.

If deploying to a subfolder instead of the domain root, update the
`<link rel="canonical">` and `og:url` tags in `index.html` and the URLs in
`sitemap.xml` first.

### A2. Upload steps (GoDaddy File Manager)

1. Log in to GoDaddy → your hosting account → **File Manager**.
2. Navigate to the target directory (`public_html/` for the domain root).
3. Upload every file/folder from the list above, **preserving the
   `assets/` folder structure**.
4. Confirm `index.html` is the directory's default document — GoDaddy does
   this automatically when it sees `index.html`.

**Steps (FTP/SFTP) instead:** same file list, any client (FileZilla,
WinSCP) works — connect with the credentials from GoDaddy's hosting
dashboard, under **cPanel → FTP Accounts** (or use your main hosting
login for the default account).

### A3. Optional: cache headers

If `.htaccess` is editable in this directory, static assets can be cached
long-term since none of them change without a redeploy:

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
</IfModule>
```

---

## Part B — Deploy vfsoffice

`vfsoffice` is a separate repo with its own complete deploy guide —
**see `vfsoffice/DEPLOYMENT.md`** for the full database setup,
`config.php` configuration, first-admin creation, and HTTPS confirmation
steps (equivalent depth to Part A above, just for that repo).

Two things to set correctly **because** the two are separate projects now:

1. In vfsoffice's `config.php`: `cors_allowed_origins` must include
   this site's exact deployed origin (scheme + host, no path).
2. In this repo's `assets/js/config.js`: `SiteConfig.backofficeBaseUrl`
   must point at wherever you deployed vfsoffice (its own subdomain,
   or a subfolder of this same hosting account like
   `https://yourdomain.com/backoffice` — both work, just be consistent
   with what you put in `base_url` over there).

Keep both on the same **registrable domain** (e.g. both under
`*.vemurigroup.in`) — see Part 0 above for why.

---

## Part C — Testing basic functionality

Work through this after both this repo and vfsoffice are deployed.
Do it in a real browser, not just curl — some of these are
visual/interactive. Replace `<backoffice-url>` below with wherever you
deployed vfsoffice.

### C1. Public site

- [ ] Page loads with content visible immediately (no blank flash).
- [ ] Hero SIP slider updates the numbers and bar chart live as you drag it.
- [ ] The 4-tap quiz walks through all 4 questions and shows a result.
- [ ] All 4 calculator tabs (SIP+top-up, SWP, Fixed deposit, Inflation)
      compute and update live as inputs change.
- [ ] Compare-table filters (All/Protect/Grow/Short term) show/hide rows.
- [ ] "Request a call back" form: submit a test entry, confirm no console
      error and the "Got it" screen appears. Then check the destination
      the Apps Script endpoint feeds, to confirm the lead actually
      arrived (not just that the form appeared to submit).
- [ ] "What Clients Say" section shows testimonials (requires Part B —
      pulls from `<backoffice-url>/testimonials-feed.php`). If empty, that's
      expected on a brand-new database with no approved testimonials yet.
- [ ] "★ Share your experience" form: submit a test review, confirm the
      "pending review" confirmation appears (it should **not** appear
      publicly yet — see the backoffice check below).
- [ ] On a real phone (or DevTools device mode) below 900px: hamburger
      menu opens, every nav link (including submenu items) works, menu
      closes on link tap.
- [ ] Browser tab shows the page title and a favicon.
- [ ] DevTools Network tab: no request to `unpkg.com` or any other CDN
      (confirms the static-only, no-build-step setup is intact).

### C2. Backoffice — login and access control

- [ ] Sign in at `<backoffice-url>/login.php` with the admin account you created per vfsoffice/DEPLOYMENT.md.
- [ ] Dashboard loads and shows role-appropriate tiles.
- [ ] Go to **Audit log** — confirm a `login_success` row appears for
      your sign-in.
- [ ] Go to **Feedback / Testimonials management** — find the test review
      you submitted in C1, **approve** it, then reload the public
      homepage and confirm it now appears in "What Clients Say."
- [ ] Create a second, non-admin test user via **Users → Add user**, sign
      out, sign in as that user, and confirm:
      - They **cannot see** the Users or Audit log links in navigation.
      - Visiting `users.php` or `audit-log.php` directly by URL is
        blocked (redirected/denied), not just hidden from the menu —
        this is the difference between a real access control and a
        cosmetic one.
- [ ] Visit `<backoffice-url>/health-check.php` while signed in as admin — it
      runs live checks for PHP version/extensions, `local_dev` being
      `false`, `config.php`/`inc/` returning 403/404 over direct HTTP,
      HTTPS being active, and a few other production-readiness signals.
      Fix anything it flags before treating the deploy as done.

For a much deeper functional pass (158 documented test cases covering
every module), see `vfsoffice/docs/test-cases.md` — most of those are
authored from code review and marked "not yet executed," i.e. a to-do
list for real QA, not something already verified.

---

## Part D — End-to-end test script for production

`scripts/production-smoke-test.sh` is a small, **safe-to-run-on-production**
script: a fixed set of read-only HTTP GET requests (via `curl`) that check
the homepage, static assets, HTTPS redirect, the testimonials pipeline, and
that sensitive backoffice files (`config.php`, `inc/`) correctly refuse
direct access. It does **not** log in, submit any form, or write to the
database — nothing it does can leave test data behind.

### Running it

```bash
chmod +x scripts/production-smoke-test.sh
./scripts/production-smoke-test.sh https://yourdomain.com
```

It prints `[PASS]`/`[FAIL]` for each check and exits with code `0` if
everything passed, `1` otherwise — safe to run manually after every
deploy, or wire into a CI job that runs after you push a release.

Example output:

```
== Production smoke test: https://yourdomain.com ==

-- Main site (static) --
  [PASS] Homepage loads and has expected title text — response contains "Vemuri Financial Services"
  [PASS] robots.txt reachable — HTTP 200
  [PASS] sitemap.xml reachable — HTTP 200
  ...

== Result: 11 passed, 0 failed ==
```

### What this script is **not**

- **Not a load test.** `vfsoffice/perf-tests/` has three k6 scripts
  (`dashboard-and-auth.js`, `amc-and-search.js`, `payment-flow.js`) for
  performance/concurrency testing — those are explicitly documented as
  **unsafe to run against production** shared hosting (they can degrade
  the live site and, in `payment-flow.js`'s case, write real rows to the
  live `payments` table). Only run those against a disposable local or
  staging copy. See `vfsoffice/perf-tests/README.md`.
- **Not a substitute for the manual functionality pass in Part C.** It
  can't click buttons, drag sliders, or verify a calculator's math — it
  only confirms pages and endpoints are *reachable and shaped correctly*.
- **Not a login/authenticated-flow test.** It deliberately avoids
  submitting credentials so it stays 100% side-effect-free. Test login
  manually per C2.

---

## Troubleshooting

- **"Could not connect to the database"** (backoffice): double-check the
  three values in `config.php` against cPanel → MySQL Databases exactly,
  including the account-name prefix on both the database name and
  username.
- **Blank white page** (backoffice): usually a PHP error being
  suppressed. Check cPanel → **Errors**, or ask your host to check the
  PHP error log. Don't turn on `display_errors` in production — it can
  leak file paths.
- **Redirect loop on HTTPS**: some GoDaddy plans proxy HTTPS differently.
  If the `.htaccess` HTTPS redirect misfires, comment out the
  `RewriteCond`/`RewriteRule` HTTPS block in `.htaccess` and rely on
  GoDaddy's own "Force HTTPS" toggle (cPanel → SSL/TLS Status) instead.
- **Testimonials section empty on the homepage**: expected on a brand-new
  database until at least one review is submitted and approved (see
  C1/C2 above) — not a bug.
- **`production-smoke-test.sh: command not found` / permission denied**:
  run `chmod +x scripts/production-smoke-test.sh` first, or invoke it as
  `bash scripts/production-smoke-test.sh https://yourdomain.com` without
  the executable bit.

---

## Updating later

To push a code change: edit the files locally, re-upload just the changed
files via File Manager/FTP. `config.php` and the database are never
touched by a code update — only run something from
`vfsoffice/database/migrations/` if a future change explicitly adds new
tables/columns (it will be called out clearly if so; each migration file
is safe to re-run individually, but re-importing `01_schema.sql`/
`02_seed_data.sql` against a database that already has data is
unnecessary once you're past the initial install). After any update, re-run
`scripts/production-smoke-test.sh` as a quick sanity check.
