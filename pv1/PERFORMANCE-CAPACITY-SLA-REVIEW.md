# Performance, Capacity & SLA Review — vfs-website

Conducted as a static-analysis review (page weight, request count, render-blocking
resources, hosting environment) — not a live load test. This environment has no
browser, network, or load-testing tooling, so every number below is either
**measured directly from the files in this repo** (page weight, request counts,
image dimensions) or an **estimate derived from typical GoDaddy shared-hosting
limits**, and each is labeled which. Treat the capacity/SLA numbers as planning
guidance, not a benchmark result — validate with a real tool (e.g. GTmetrix,
WebPageTest, or `ab`/`k6` against the live domain) before quoting them externally.

## 1. What this site actually is, for context

`vfs-website` is a static HTML/CSS/JS marketing site — `index.html` plus a
handful of asset files, no server-side rendering, no database, no application
logic of its own. It links out to the separate `vfsoffice` PHP/MySQL app
for anything dynamic (login, calculators that save data, GST tooling). That
distinction matters for capacity planning: a static file has no CPU cost to
"execute," so its ceiling is almost entirely about **bandwidth and concurrent
connections**, not application performance.

## 2. Page weight & request count (measured)

Full fresh page load of `index.html`, no browser cache:

| Resource | Count | Size |
|---|---|---|
| `index.html` | 1 | 104 KB |
| CSS (`tokens`, `base`, `components`, `utilities`, `responsive`) | 5 | 39 KB |
| Google Fonts stylesheet | 1 | ~2–5 KB (estimated, not vendored) |
| Google Fonts font files (Barlow 400/500/600, Barlow Condensed 500/600/700) | ~4–8 (estimated — Google serves per-weight, per-subset) | ~60–100 KB (estimated) |
| JavaScript (10 files: config, format, finance, calculators, quiz, contact-form, testimonials, nav, reveal, main) | 10 | 43 KB |
| Images | 1 (`vemurifin.png`, the header logo) | **945 KB** |
| **Total** | **~22 requests** | **~1.19 MB** |

### Finding P0 — the logo is the whole problem

`assets/images/vemurifin.png` is **1254×1254 px, 945 KB**, but is displayed in
the header at **30×30 px** (`index.html:104`). It also appears once more as the
Open Graph share image (`index.html:14`), where a large image is actually
appropriate — but the header `<img>` shouldn't be serving the same multi-hundred-
KB file just to shrink it 42x in the browser.

This single file is **~79% of the entire page's weight**. Every other resource
combined — HTML, all 5 CSS files, all 10 JS files, Google Fonts — totals roughly
250 KB. Resizing/re-encoding just this one image to something appropriate for a
30×30 display size (a 60–90 px @2x PNG or WebP, realistically 3–10 KB) would cut
total page weight from ~1.19 MB to **~250–260 KB — a 4–5x reduction** — without
touching a single other file. This is the highest-leverage fix available and
should be done before anything else in this report.

### Finding P1 — no compression or cache headers configured

`.htaccess` sets security headers (`X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, HSTS) and forces HTTPS, but has **no `mod_deflate`/`mod_brotli`
compression directives and no `mod_expires`/`Cache-Control` rules** for static
assets. Two separate effects:

- **Compression**: GoDaddy's shared-hosting Apache/LiteSpeed layer often enables
  gzip by default regardless of `.htaccess`, but that's a hosting-account setting
  this repo doesn't control or guarantee — worth confirming directly (curl -H
  "Accept-Encoding: gzip" against the live domain, check for a
  `Content-Encoding: gzip` response header) rather than assuming.
- **Caching**: with no `Cache-Control`/`Expires` header, a repeat visitor's
  browser has no instruction to reuse cached CSS/JS/images and may re-validate
  or re-download them on every visit, multiplying real-world bandwidth use for
  return visitors well beyond the "one fresh load" number above.

### Finding P2 — 5 separate render-blocking CSS requests

`tokens.css`, `base.css`, `components.css`, `utilities.css`, `responsive.css`
are each a separate synchronous `<link rel="stylesheet">` in `<head>` — 5 round
trips before first paint. Combined they're only 39 KB, so this is a minor,
second-order finding (each is small and HTTP/2 multiplexes them over one
connection on modern hosting) — worth combining into one file at some point,
but nowhere near the impact of the logo fix.

### What's already right

- All 10 JS files load at the very end of `<body>` (not `<head>`), so they
  never block first paint — no `defer`/`async` needed, this is already the
  non-blocking pattern.
- Google Fonts uses `&display=swap` (no invisible-text flash) and both
  `preconnect` hints are present — already following current best practice for
  that specific dependency.
- Exactly one `<img>` tag on the whole page (the logo) — everything else is
  CSS/inline SVG, so there's no gallery of unoptimized images to chase, just
  the one.
- Zero third-party `src=`/embed dependencies beyond Google Fonts — every other
  external domain referenced on the page (social profiles, regulator sites,
  partner links) is a plain `href` link, not a resource the browser fetches on
  load. That's a clean, minimal-dependency footprint.

## 3. Supported environment (captured from this repo's own deployment docs)

| Layer | Value | Source |
|---|---|---|
| Hosting | GoDaddy shared hosting, cPanel | `DEPLOYMENT.md` |
| Web server | Apache (or GoDaddy's LiteSpeed equivalent) with `mod_rewrite`, `mod_headers` | `.htaccess` (`<IfModule>` guards imply these may not be present on all plans) |
| TLS | Forced HTTPS via `.htaccess` redirect; GoDaddy's included free SSL | `.htaccess` |
| Rendering | Static HTML/CSS/JS, no build step, no framework | `index.html` structure |
| Backend dependency | None for this site itself; links out to `vfsoffice` (separate PHP 8 / MySQL app) for dynamic features | `ARCHITECTURE.md` |
| Browser support | Not explicitly declared anywhere in the repo (no `browserslist`, no documented minimum-browser policy) | absence noted as a gap |

**Gap worth closing**: there's no explicit "supported browsers" statement
anywhere in the repo. Given the CSS/JS in use (CSS custom properties, `fetch`,
template literals — all broadly supported), a reasonable stated baseline would
be *"the last 2 versions of Chrome, Edge, Firefox, Safari, plus iOS/Android
default browsers — no IE11 support"* — but that's a product decision to
confirm and write down (e.g. in `ARCHITECTURE.md`), not something to infer
silently.

## 4. Capacity estimate — labeled as an estimate, not a benchmark

No load-testing tool is available in this environment, so this section reasons
from (a) this page's measured weight above and (b) publicly documented typical
limits of GoDaddy's shared-hosting tiers, which are usually **CPU/process-count
capped rather than bandwidth-capped** for static files:

- GoDaddy shared plans typically cap **simultaneous Apache/LSAPI processes**
  per account (historically on the order of 20–30 concurrent connections per
  visitor-serving process pool on entry-level tiers), not a hard
  "requests-per-second" ceiling. Static file serving (HTML/CSS/JS/images) is
  cheap per-request compared to PHP execution, so this site's own pages are
  unlikely to be the bottleneck — the shared account's overall limit (shared
  across this site AND `vfsoffice`, if both live on the same hosting
  account) is the real ceiling.
- **At today's ~1.19 MB/page weight**: on a typical shared-hosting outbound
  bandwidth allocation, a sustained burst of concurrent fresh page loads (no
  caching) is the realistic stress case — e.g., a traffic spike from a social
  post or ad campaign, not steady organic traffic.
- **After the P0 logo fix (~250 KB/page)**: the same burst costs ~4–5x less
  bandwidth and completes faster per visitor, directly reducing how long each
  connection occupies a process slot — which is the actual lever for
  "how many requests can it handle" on shared hosting.

**Recommendation**: don't treat "requests/sec" as a fixed number to defend —
GoDaddy shared hosting doesn't publish one, and it depends on what else is
running on the account at that moment. Instead, track the two things this repo
*can* control and verify:
1. Page weight (measured above — fix P0 first).
2. Real response times from an external tool (GTmetrix/WebPageTest/`curl -w`)
   against the live domain, re-checked after each fix in this report.

## 5. Recommended SLA

Since there's no current uptime/response-time monitoring in this repo (no
Godaddy uptime tier documented, no external monitor referenced), the following
is a **proposed target**, not a measured historical SLA:

| Metric | Target | Basis |
|---|---|---|
| Uptime | 99.5% monthly (~3.6 hours downtime budget/month) | Realistic for unmanaged shared hosting without a CDN/failover — GoDaddy doesn't contractually guarantee higher on base shared plans |
| Time to First Byte | < 600 ms | Typical for static HTML on shared hosting with no server-side work |
| Full page load (fresh, no cache) | < 2.5 s on a typical broadband connection | Achievable once the P0 logo fix lands; not realistic today at 1.19 MB with an unoptimized largest asset |
| Full page load (repeat visit, cached) | < 800 ms | Requires the P1 cache-header fix — not achievable today since nothing is cached |

If a contractual/customer-facing SLA is actually needed (not just an internal
target), that requires either upgrading to a hosting tier with an uptime
guarantee, or fronting the site with a CDN (Cloudflare free tier is a common,
low-effort option for a static site like this) — neither is currently in place.

## 6. Prioritized action list

1. **[P0]** Re-encode `assets/images/vemurifin.png` at a size appropriate for
   its largest actual display use (header logo, 30×30 CSS px — a 90×90 px @3x
   PNG/WebP is generous headroom) and keep a separate, larger version only for
   the Open Graph share tag if a big preview image is wanted there. Expected
   result: ~1.19 MB → ~250 KB per fresh page load.
2. **[P1]** Add `mod_expires`/`Cache-Control` rules to `.htaccess` for
   `assets/**` (CSS/JS/images) — e.g. 30–90 days with `immutable` if filenames
   get cache-busted on change, or a shorter window if not.
3. **[P1]** Confirm gzip/brotli is actually active on the live GoDaddy account
   (`curl -sI -H "Accept-Encoding: gzip" https://fin.vemurigroup.in/` and check
   for `Content-Encoding`) — add explicit `mod_deflate` rules to `.htaccess` if
   it isn't.
4. **[P2]** Combine the 5 CSS files into one (or two: critical + deferred) to
   cut render-blocking requests from 5 to 1–2.
5. **[P2]** Write down a supported-browser baseline in `ARCHITECTURE.md` so
   it's a stated decision, not an implicit gap.
6. **[Verification]** After 1–3 land, re-run an external tool (GTmetrix/
   WebPageTest) against the live domain and replace the estimated numbers in
   §4/§5 above with measured ones.
