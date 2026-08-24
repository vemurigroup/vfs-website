# Changelog

All notable changes to the Vemuri Financial Services website will be documented in this file.

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
