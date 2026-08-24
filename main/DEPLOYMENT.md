# Deployment Guide

This document covers running the Vemuri Financial Services site locally and deploying a production build to GoDaddy (or any cPanel/shared host).

The app is a Vite + React 19 Single Page Application (SPA). There is no server-side code — the production output is a static `dist/` folder (HTML, CSS, JS) that any web host can serve.

---

## 1. Local Development

### Prerequisites
- Node.js v18 or higher
- npm (bundled with Node.js)

### Steps

```bash
# From vfs-website/main (this folder)
npm install       # installs dependencies into node_modules/
npm run dev        # starts the Vite dev server
```

Vite prints the local URL, normally **http://localhost:5173/**. The dev server has hot module reload — edits under `src/` appear instantly without a manual refresh.

To stop the server, press `Ctrl+C` in the terminal running it (or kill the process listening on port 5173).

### Useful local scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local dev server with HMR |
| `npm run build` | Produce the optimized production build in `dist/` |
| `npm run preview` | Serve the built `dist/` folder locally, to sanity-check the production bundle before deploying |
| `npm run lint` | Run oxlint over `src/` |

> Note: the repo also lives inside XAMPP's `htdocs/`, so Apache can serve `vfs-website/` directly at `https://localhost/vfs-website/` — but that only works for the **legacy static site**, now archived under [`../pv1/`](../pv1/) (and `../pv0/`). The current React app in this `main/` folder is not static markup; it must be built (`npm run build`) or run through the Vite dev server. Apache serving the raw `src/` folder will 404 on `/src/main.jsx`.

---

## 2. Production Build

```bash
npm install        # if not already installed
npm run build
```

This generates a `dist/` folder containing the fully bundled, minified, production-ready site:

```text
dist/
├── index.html
└── assets/
    ├── index-<hash>.css
    ├── index-<hash>.js          # main bundle (home page)
    ├── GstHelper-<hash>.js      # GST tools, loaded on demand
    ├── PartnerHub-<hash>.js     # Partner Hub, loaded on demand
    └── VfsOfficeBenefits-<hash>.js
```

The GST Helper, Partner Hub, and VFS Office Benefits views are code-split (lazy-loaded) so the initial page load stays light — those chunks only download when a visitor actually opens those sections.

Sanity-check the build before uploading anything:

```bash
npm run preview
```

This serves `dist/` at a local URL (default `http://localhost:4173/`) exactly as a production host would.

---

## 3. Deploying to GoDaddy (cPanel / Shared Hosting)

GoDaddy shared hosting plans serve static files from `public_html/`. There is no build step on the server — you build locally (or in CI) and upload the finished `dist/` contents.

### Option A: cPanel File Manager (no FTP client needed)

1. Run `npm run build` locally. Confirm `dist/` was created and `npm run preview` looks correct.
2. Zip the **contents** of `dist/` (select the files inside `dist/`, not the `dist` folder itself) into `site.zip`.
3. Log in to GoDaddy → **My Products** → your hosting plan → **cPanel Admin**.
4. Open **File Manager**, navigate to `public_html/` (or the subfolder for your domain/subdomain, if the site isn't at the domain root).
5. If this is a redeploy, back up or clear the old files first (keep any non-site files like `.well-known/` untouched).
6. Click **Upload**, upload `site.zip` into `public_html/`, then select it and choose **Extract**.
7. Delete `site.zip` after extraction. Confirm `index.html` and the `assets/` folder sit directly inside `public_html/`.

### Option B: FTP (FileZilla or similar)

1. Get your FTP credentials from GoDaddy → **cPanel** → **FTP Accounts** (or use the primary hosting account credentials).
2. Connect FileZilla to `ftp.yourdomain.com` (or the host GoDaddy provides), port 21, using those credentials.
3. On the remote side, navigate to `public_html/`.
4. Drag the **contents** of your local `dist/` folder into `public_html/` (again, contents — not the folder itself).
5. Confirm `index.html` is directly inside `public_html/`, alongside the `assets/` folder.

### SPA routing / refresh handling

This app currently drives all views through a `?view=...` query parameter on a single `index.html` (see `src/App.jsx`), not through path-based routes like `/partner`. That means a plain GoDaddy static host works out of the box — there is **no** need for a `RewriteRule` fallback to `index.html`, since every URL the app produces (`/`, `/?view=partner`, `/?view=gst`, `/?view=vfs-benefits`) already resolves to the same `index.html` file. Refreshing any of those URLs works without special server config.

If the routing scheme is ever changed to real paths (e.g. `/partner` instead of `/?view=partner`), add this `.htaccess` to `public_html/` so refreshes on those paths don't 404:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Force HTTPS (recommended)

GoDaddy shared hosting includes a free SSL certificate on most plans. Once it's active, force HTTPS with an `.htaccess` at `public_html/`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

(This can live in the same `.htaccess` as the SPA fallback rule above, if both are needed.)

---

## 4. Post-Deployment Checklist

- **Load the live domain** and confirm the hero section renders (not a blank page — a blank page usually means `assets/` didn't upload, or paths are wrong).
- **Browser console**: open DevTools → Console on the live site, confirm no 404s for JS/CSS chunks.
- **WhatsApp button**: click the floating WhatsApp button, confirm it opens a chat to `+91 98862 91668`.
- **Portal links**: "VFS Office" and "Client Login" open their respective subdomains (`vfsoffice.vemurigroup.in`, `vfs.vemurigroup.in`) in a new tab.
- **GST Helper / Partner Hub / VFS Office Benefits**: open each via the footer links, confirm they load (these are the lazy-loaded chunks — first load will show a brief spinner).
- **Mobile check**: verify the header collapses to the hamburger menu and the layout doesn't overflow horizontally.
- **Cache-busting**: Vite hashes filenames per build (`index-<hash>.js`), so re-uploading a new `dist/` after every change is enough — no manual cache purge needed, as long as you replace **all** files in `public_html/`, not just some.
- **Lighthouse**: run a quick Performance/SEO pass in Chrome DevTools against the live URL.

---

## 5. Alternative Hosts

GoDaddy is the target for this project, but since the output is a static SPA it can also be deployed to:

- **Vercel / Netlify**: connect the GitHub repo, build command `npm run build`, output directory `dist`. Gives you automatic deploys on every push.
- **AWS S3 + CloudFront**: upload `dist/` to an S3 bucket with static website hosting enabled (index document `index.html`), front it with CloudFront for HTTPS + caching.

These aren't currently configured for this project — GoDaddy/cPanel (Section 3) is the supported path.
