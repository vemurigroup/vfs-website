# Architecture

One-page orientation for anyone new to this repo. Written from the
codebase as it actually stands today — not a proposal or a target state.
This repo now contains **only the public marketing site**. The back-office
application lives in a separate project, `vfsoffice` — see that
repo's own `README.md`/`ARCHITECTURE.md` for its internals, and "Relation
to vfsoffice" below for how the two connect.

## Repo layout

```
vfs-website/
├── index.html, partner-info.html      # public marketing site
├── assets/{css,js,images,vendor}/     # static assets, no build step
├── robots.txt, sitemap.xml
├── .htaccess                          # HTTPS redirect + security headers
│
├── google-apps-script/                # Apps Script backend for the public "call back" form
├── pv1/                               # archived previous-generation site — not deployed
└── v2/                                # empty — vestigial, safe to remove
```

**Why this used to be two apps in one repo, and isn't anymore**: the
public site is static HTML/CSS/JS with zero build step (deploy = upload
files); the back-office is a PHP+MySQL app with its own auth, database,
and deploy process. They shared nothing but a visual component
vocabulary, so on 2026-08-05 the back-office was split out into
`vfsoffice`, a fully self-contained separate project (own copy of
every CSS/vendor-JS/image it needs — no filesystem dependency back on
this repo). See `CHANGELOG.md` for the split itself.

## The public site

Plain HTML/CSS/JS, no framework, no bundler. One page controller pattern:
each JS file in `assets/js/` owns exactly one concern (`quiz.js`,
`calculators.js`, `contact-form.js`, `testimonials.js`, `nav.js`,
`reveal.js`, `config.js`). `config.js`'s `SiteConfig` object is the single
source of truth for business name/phone/email/WhatsApp **and** where the
back-office app lives (`backofficeBaseUrl`) — everything tagged
`data-cfg="..."` in the HTML picks it up automatically
(`ConfigApply.init()`), with the literal HTML content left as a safe
fallback if JS fails to load.

Forms POST to Google Apps Script (`google-apps-script/`) for the "Request
a call back" form, and to vfsoffice's endpoints (cross-origin) for
testimonials/reviews — no separate backend of its own.

## Relation to vfsoffice

Three things connect the two projects, all driven from one place on each
side:

1. **Links** — `data-cfg="backoffice-link"` elements (login button,
   pricing page, demo request) build their `href` from
   `SiteConfig.backofficeBaseUrl`.
2. **Live data fetches** — `assets/js/testimonials.js` calls
   `testimonials-feed.php`, `csrf-token.php`, `testimonial-submit.php` on
   vfsoffice, cross-origin, with `credentials: 'include'` (the
   session cookie has to survive the cross-origin request for the CSRF
   round-trip to work).
3. **CORS** — vfsoffice's `config.php` must list this site's exact
   deployed origin in `cors_allowed_origins`, or the two calls above are
   silently blocked by the browser. Both should share the same
   **registrable domain** (e.g. both `*.vemurigroup.in`) — the session
   cookie is `SameSite=Lax`, which allows cross-subdomain but not
   cross-domain requests.

Nothing else couples the two — no shared filesystem paths, no shared
build step, no shared deploy process.

## What's genuinely still missing (as of this doc)

Not a stale wishlist — verified against the current codebase directly:

- **CSP** — deliberately not set. `.htaccess` documents why: the app has
  many inline `<script>` blocks that would need a nonce/hash audit first;
  tightening blind risks silently breaking working pages.
- **Analytics** (GA4 or equivalent) — not present.
- **CI/CD** — no `.github/workflows/`; deploy is manual upload per
  `DEPLOYMENT.md`.
- **Automated tests** — no test suite for this repo; `scripts/production-smoke-test.sh`
  is a read-only post-deploy smoke check, not a real test suite.
- **Versioning** — no semver/tags; this repo does keep `CHANGELOG.md`
  from 2026-08-05 forward.

What's **not** missing, despite an old internal review document
(`ENTERPRISE-REVIEW.html`, now superseded — see the note at its top)
claiming otherwise: structured error logging, audit trail, health
checks, feature flags, a backup mechanism, and a substantial knowledge
base — all of those live in `vfsoffice`'s own `docs/` now, see that
repo directly.
