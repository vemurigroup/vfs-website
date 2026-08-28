# Changelog

All notable changes to the Vemuri Financial Services website will be documented in this file.

## [1.3.0] - 2026-08-25

### Added
- **Loan Against Shares**: added to `Services.jsx` (main site) and the Partner Hub's Loans section (`partnerData.json`), linking to the Mirae Asset apply flow. The existing "Mirae Asset" partner-login card in the Loans section was left as-is.
- **Contact "Visit Us" block**: new section below the contact form/info grid in `Contact.jsx` with an embedded, responsive Google Maps iframe and a "Leave Us a Google Review" button.
- **Header "More" dropdown**: added to both the home and partner views, covering sections that existed on the page but were missing from navigation — Testimonials, FAQs, KYC Services, Compliance, Contact (home); Commodity, AMC Directory, Compliance (partner). Same hover-dropdown pattern already used elsewhere in the header, mirrored flat in the mobile menu.

### Changed
- **Calculator alignment**: `Sip.jsx` (SIP/Lumpsum) used a smaller card (rounded-2xl, tighter padding/gap) than `Swp.jsx`/`Fd.jsx`/`Inflation.jsx`, causing a visible resize when switching tabs. Unified all four to the same card size and removed each one's self-margin, which had also misaligned the card against the "Popular Calculators" sidebar.
- **Calculators section spacing**: header block brought in line with every other section's `mb-16 space-y-4` convention; content row's stray `-mt-2` replaced with proper spacing and explicit `items-start` alignment.
- **Google reviews link** (`Testimonials.jsx`, `Contact.jsx`): was pointing at a search result for an unrelated business ("Vemuri Espousal Pvt Ltd"). Fixed to a stable link for the correct business — a search query plus the `#lrd=` reviews-panel fragment, with the session-bound tracking params (`sxsrf`, `ei`, `biw`/`bih`, `gs_lp`, `sclient`) stripped out since they weren't needed and were the actual expiry risk.
- **Header Login menu**: consolidated the separate "VFS Office" dropdown and standalone "Client Login" button into a single "Login" dropdown (Client Login, then a VFS Office group with Portal Login). Fixes a layout bug where, between 768–1023px, the hamburger menu and all three former buttons rendered simultaneously — their breakpoint now matches the hamburger's own `lg:` cutoff.
- **VFS Office "Benefits & Utilization"** moved out of the header (now just Portal Login there) and into the footer's "Portals & Resources" list, as "VFS Office Benefits & Pricing".

## [1.2.0] - 2026-08-24

### Changed
- **VFS Office Benefits pricing**: Medium plan updated from ₹50 to ₹49/month, Advanced plan updated from ₹100 to ₹99/month (`VfsOfficeBenefits.jsx`).
- **Footer cleanup**: Replaced `onViewChange && onViewChange(...)` short-circuit calls with `onViewChange?.(...)` across `Footer.jsx` — fixes 11 `no-unused-expressions` oxlint warnings. `npm run lint` now reports zero warnings.

### Removed
- A short-lived footer section linking to the archived legacy sites (`pv0/`, `pv1/`) was added and then reverted in the same pass — `pv0/` was found to have no `assets/` folder at all (its HTML references `../assets/`, which doesn't exist anywhere in the repo) and would have rendered as broken, unstyled HTML if shipped.

## [1.1.0] - Recent Updates

### Added
- **Floating WhatsApp Integration**: Added a persistent, globally available WhatsApp FAB (Floating Action Button) to the bottom right corner of the application to enable quick client communication.
- **Logo Animation**: Added a custom `shine-wrapper` CSS animation in `index.css` to create a sweeping light reflection effect across the company logo.
- **AMFI Compliance Badge**: Added a prominent AMFI Registered Mutual Fund Distributor badge (ARN-302882) directly below the header taglines to comply with strict regulatory visibility guidelines.

### Changed
- **Header Redesign**: Completely overhauled `Header.jsx`. Integrated a new circular logo (`vemurifin.jpg.png`), increased its size up to `h-24`, and adjusted header padding (`py-3 md:py-4`) to accommodate dynamic heights without overlapping issues.
- **Navigation Simplification**: Removed the nested "Portals" dropdown from the header to reduce visual clutter. Re-positioned "VFS Office" and "Client Login" as dedicated buttons alongside the "Get Advice" CTA.
- **Hero Spacing**: Dynamically adjusted the top padding (`pt-36 md:pt-40`) of the `Hero.jsx` component to prevent the hero content from slipping underneath the newly enlarged translucent header.
- **Section Spacing Optimization**: Globally reduced the vertical padding of all major content sections (from `py-24` down to `py-8`) to create a more compact, modern, and easily scannable layout.
- **Regulatory Updates**: Updated all references of ARN-70362 to the current ARN-302882 across the Header, Footer, and Compliance components. Added specific AMFI commission disclosures to the Compliance section.

## [1.0.0] - Initial React Migration

### Added
- Successfully migrated the legacy HTML/Vanilla JS site into a modern React SPA using Vite.
- Implemented `Framer Motion` for smooth scroll-reveal animations across all sections (Pillars, Solutions, Services).
- Established a central `App.jsx` state manager to handle view switching (`home`, `partner`, `gst`) without triggering browser reloads.
- Integrated Lucide React for consistent vector iconography.
- Set up Tailwind CSS for highly maintainable utility-first styling.
