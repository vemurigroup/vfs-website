> **Archived — not the live site.** This is the legacy static HTML/vanilla-JS
> version of the site, kept for reference. The live site is the Vite + React
> app in [`../main/`](../main/) — see [`main/README.md`](../main/README.md) and
> [`main/DEPLOYMENT.md`](../main/DEPLOYMENT.md).

# vfs-website

Vemuri Financial Services — public marketing site.

The back-office application (client onboarding, AMC data, reports,
subscriptions, payments) is a **separate project**, `vfsoffice`
(sibling folder / separate Git repo), not part of this repo anymore. See
[Relationship to vfsoffice](#relationship-to-vfsoffice) below —
the two are independently deployable but the public site still links to
and fetches live data from the back-office app.

## Layout

- `index.html`, `partner-info.html`, `assets/`, `robots.txt`,
  `sitemap.xml`, `.htaccess` — the public marketing site (plain
  HTML/CSS/JS, no build step). Deploy per `DEPLOYMENT.md`.
- `google-apps-script/` — the Apps Script backend for the marketing site's
  "Request a call back" form.
- `pv1/` — **archived**, the previous generation of the marketing site.
  Not deployed; kept for historical reference only. See `pv1/README.md`.
- `v2/` — empty, vestigial from an earlier restructuring; safe to remove.
- `ARCHITECTURE.md` / `CHANGELOG.md` — current-state architecture doc and
  changelog for this repo specifically.

## Getting started

No setup needed — open `index.html` directly, or deploy per
`DEPLOYMENT.md`.

## Relationship to `vfsoffice`

This site is **not fully independent** of the back-office app, even
though the code now lives in a separate project:

- `assets/js/config.js`'s `SiteConfig.backofficeBaseUrl` is the **one
  place** this site knows where the back-office app lives — every link to
  it (`data-cfg="backoffice-link"` hrefs: login, pricing, demo request)
  and every live fetch (`assets/js/testimonials.js` — the "Client
  Experiences" grid and "Share your experience" form) is driven from that
  single value. Update only that when the back-office's URL changes.
- The back-office's `config.php` must list this site's real origin in
  `cors_allowed_origins`, or the testimonials feed/submit calls will be
  silently blocked by the browser (they're cross-origin `fetch()` calls
  now that the two are separate deployments).
- Both should be deployed under the **same registrable domain** (e.g.
  both `*.vemurigroup.in`, even as different subdomains) — the session
  cookie the CSRF flow depends on is `SameSite=Lax`, which allows
  cross-subdomain requests but would silently break across two genuinely
  different domains.
- The "Request a call back" form does **not** need the back-office — it
  posts to a Google Apps Script webhook instead (see
  `google-apps-script/DEPLOY-STEPS.md`).

See `vfsoffice/README.md` / `ARCHITECTURE.md` for that project's own
setup and deploy docs.
