# Vemuri Financial Services — Website

The public marketing site for **Vemuri Financial Services** (Indian Mutual Fund Distribution), live at **[fin.vemurigroup.in](https://fin.vemurigroup.in/)**.

A React 19 + Vite single-page app — no server-side code, ships as a static `dist/` bundle any host can serve.

```
vfs-website/
├── main/     ← the live app (this is what you build/deploy)
├── pv0/      ← archived earlier version
└── pv1/      ← archived earlier version
```

All commands below are run from `main/`, not the repo root:

```bash
cd main
```

---

## 1. Install the required software

| Tool | Why | Download |
|---|---|---|
| **Node.js** (v18+, LTS recommended) | Runs the build tooling; bundles `npm` | [nodejs.org](https://nodejs.org/) |
| **Git** | Clone the repo, push/pull changes | [git-scm.com/downloads](https://git-scm.com/downloads) |
| **A code editor** (optional) | e.g. VS Code | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Vercel CLI** (only if deploying to Vercel) | `npm install -g vercel` | [vercel.com/docs/cli](https://vercel.com/docs/cli) |
| **FileZilla** (only if deploying to GoDaddy via FTP) | GUI FTP client | [filezilla-project.org](https://filezilla-project.org/) |

Verify Node/npm installed correctly:

```bash
node -v      # v18.x or higher
npm -v
```

---

## 2. Run it locally

```bash
git clone https://github.com/vemurigroup/vfs-website.git
cd vfs-website/main
npm install       # installs dependencies into node_modules/
npm run dev       # starts the Vite dev server
```

Open the URL Vite prints — normally **http://localhost:5173/**. Edits under `src/` hot-reload instantly. Stop the server with `Ctrl+C`.

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the built `dist/` locally, to sanity-check before deploying |
| `npm run lint` | Run oxlint over `src/` |

Full local-dev detail (including the XAMPP/`htdocs` note) is in [`main/DEPLOYMENT.md`](main/DEPLOYMENT.md#1-local-development).

---

## 3. Deploy to GoDaddy (production host)

The live site (`fin.vemurigroup.in`) is hosted on GoDaddy shared hosting (cPanel), serving the built static files from `public_html/vfs-website/`.

```bash
cd main
npm install
npm run build      # produces dist/index.html + dist/assets/*
npm run preview    # sanity-check at http://localhost:4173/ before uploading
```

Then upload the **contents** of `dist/` (not the `dist` folder itself) to `public_html/vfs-website/` on the GoDaddy account, either via:

- **cPanel File Manager** — zip `dist/`'s contents, upload, extract, delete the zip.
- **FTP/SFTP** (FileZilla or similar) — drag `dist/`'s contents straight into `public_html/vfs-website/`, replacing the old `index.html` and `assets/` files.

Vite hashes every filename per build (`index-<hash>.js`), so replacing **all** files each deploy is enough — no separate cache purge needed.

Full step-by-step (cPanel + FTP, SPA routing notes, HTTPS redirect, post-deploy checklist) is in **[`main/DEPLOYMENT.md`](main/DEPLOYMENT.md#3-deploying-to-godaddy-cpanel--shared-hosting)**.

---

## 4. Deploy to Vercel

This repo is already linked to a Vercel project (`vfs-website`, under the `ramanujadasumca-1708` team), live at **[vfs-website-three.vercel.app](https://vfs-website-three.vercel.app)** — used for preview/staging builds alongside the GoDaddy production host.

**One-time setup** (already done for this project, but here for a fresh clone/new machine):

```bash
npm install -g vercel
vercel login
cd vfs-website           # repo root, not main/
vercel link              # links this folder to the existing Vercel project
```

When prompted for **Root Directory**, set it to `main` — the app's `package.json` lives in `main/`, not the repo root. Vercel auto-detects the Vite framework preset (build command `npm run build`, output directory `dist`) once the root directory is set correctly.

**Deploy:**

```bash
vercel --prod             # deploy straight to production
# or
vercel                    # deploy a preview (non-production) build first
```

Alternatively, connect the GitHub repo in the [Vercel dashboard](https://vercel.com/dashboard) for automatic deploys on every push to `main` — set **Root Directory** to `main` there too.

---

## 5. Links & contacts

| | |
|---|---|
| **Live site** | [fin.vemurigroup.in](https://fin.vemurigroup.in/) |
| **Vercel deployment** | [vfs-website-three.vercel.app](https://vfs-website-three.vercel.app) |
| **VFS Office (client back-office portal)** | [vfsoffice.vemurigroup.in](https://vfsoffice.vemurigroup.in/) |
| **VFS client login** | [vfs.vemurigroup.in](https://vfs.vemurigroup.in/) |
| **Email** | [vemurifin@gmail.com](mailto:vemurifin@gmail.com) |
| **WhatsApp** | +91 98862 91668 |

---

See [`main/DEPLOYMENT.md`](main/DEPLOYMENT.md) for the full deployment guide (including the post-deploy checklist and SPA-routing notes) and [`main/CHANGELOG.md`](main/CHANGELOG.md) for release history.
