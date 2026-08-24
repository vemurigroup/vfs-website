# Complete Test Report — vfs-website

Functional/QA validation, performed as static code analysis (no browser, no
network access, no live-site access in this environment — every finding below
is either verified directly against the source files or explicitly marked as
"not verifiable here" so it isn't mistaken for something that was checked).
Companion to `PERFORMANCE-CAPACITY-SLA-REVIEW.md`, which covers performance/
capacity/SLA — this report covers correctness/functionality/accessibility.

**Scope**: `index.html` (primary site) + `partner-info.html`, and every asset
they load. **Out of scope / not verifiable in this environment**: actual
rendered visual output, cross-browser behavior, real network requests to
external services (Google Apps Script endpoint, backoffice API), color
contrast ratios, screen-reader behavior, and Lighthouse/axe automated scores —
these need a real browser and are called out explicitly wherever relevant
rather than guessed at.

## Summary

| Category | Result |
|---|---|
| Internal anchor links (nav → section) | ✅ Pass — all 37 referenced anchors resolve |
| Duplicate `id` attributes | ✅ Pass — one false-positive investigated and cleared (see below) |
| Heading hierarchy | ✅ Pass — single `<h1>`, sensible h2→h3→h4 cascade, no h5/h6 |
| Image `alt` text | ✅ Pass — both real `<img>` tags (index.html, partner-info.html) have `alt` |
| Forms — structure & labels | ✅ Pass — all fields have associated `<label for>` |
| Forms — validation & submission | ✅ Pass — real endpoints configured, not placeholders; proper error handling |
| Forms — spam protection | ✅ Pass — honeypot field on the review form |
| Responsive breakpoints | ✅ Pass — 4 breakpoints covering desktop → 400px |
| Dead/orphaned code | ⚠️ Found — 3 unused files (see Defects) |
| TODO/FIXME markers | ✅ Pass — none found |
| Unguarded DOM lookups | ✅ Pass — every `getElementById`/`querySelector` chain checked targets an element confirmed present on its actual page |

## Detailed findings

### 1. Navigation & internal links — PASS

Extracted every `href="#..."` anchor referenced anywhere in `index.html` (37
distinct targets: nav dropdowns, goal-shortcut links, footer links, in-page
CTAs) and every `id="..."` defined in the page. **Every anchor resolves to a
real target** — zero broken internal links.

### 2. Duplicate IDs — investigated, cleared

A raw grep for `id="trust"` initially flagged 2 matches. Investigated: one is
inside an HTML comment (`... id="trust" is kept on the Regulatory <details>...`
— prose describing the code, not markup) at line 1140; the real element is the
single `<details id="trust">` at line 1208. No actual duplicate — HTML is
valid here. Documenting the check (and that it came back clean) rather than
silently passing over it, since duplicate IDs are a common, easy-to-miss bug
class.

### 3. Heading hierarchy — PASS

One `<h1>` (`"What should you do first?"` — the hero), 26 `<h2>`, 36 `<h3>`,
51 `<h4>`, zero `<h5>`/`<h6>`. No level-skipping detected in the sections
spot-checked. Good for both accessibility (screen-reader section navigation)
and SEO.

### 4. Forms — PASS, both fully wired to real backends

**"Request a call back" form** (`#callbackForm`):
- Client-side validation (`assets/js/contact-form.js`): name required, phone
  must have ≥10 digits, both checked before any network call.
- Submits to a **real, deployed Google Apps Script Web App URL** (not a
  placeholder — `isConfigured()` explicitly checks for and would refuse a
  default/unset endpoint, and the configured URL matches the expected
  `script.google.com/macros/s/.../exec` pattern).
- Handles all 3 failure modes distinctly: network/CORS failure before any
  response, non-2xx HTTP status, and a 200 response that isn't valid JSON
  (stale/misconfigured Apps Script deployment) — each produces a specific,
  user-visible error message, not a silent failure.
- Submit button disabled during send (prevents double-submit); resets
  correctly via "Send another."

**"Share your experience" review form** (`#reviewForm`):
- Submits to `testimonial-submit.php` on the configured backoffice base URL
  (confirmed this endpoint exists in the `vfsoffice` project).
- Honeypot anti-spam field (`website_url`, visually hidden, `tabindex="-1"`,
  `autocomplete="off"`) — a real bot filling every field populates it;
  humans never see or fill it.
- Consent checkbox is `required` before the browser will submit at all.
- Sets user expectations correctly: hint text explicitly says reviews are
  moderated before appearing, not instant.

Not verifiable here: whether the Apps Script endpoint or `testimonial-
submit.php` are actually reachable right now (would need a live network
request) — the code is correctly wired to real, non-placeholder URLs, which is
what static analysis can confirm.

### 5. Accessibility — PASS on structural basics, gaps noted where relevant

- Every form field has a `<label for="...">` matching its input's `id` — no
  placeholder-as-label anti-pattern.
- Decorative elements (corner flourishes, honeypot wrapper) correctly use
  `aria-hidden="true"`.
- Star-rating buttons use `aria-pressed` state.
- `<html lang="en">` set.
- **Not verifiable here**: color contrast ratios, focus-visible styling,
  actual screen-reader announcement behavior, keyboard-only navigation
  through the mega-menu dropdowns — all need a real browser/AT (assistive
  technology) to check. Recommend a pass with axe DevTools or WAVE before
  calling accessibility "done," not just this static check.

### 6. Responsive design — PASS (structural)

4 breakpoints: `min-width: 1100px` (desktop nav), `max-width: 1099px`
(tablet/mobile nav switch), then `640px`, `560px`, `400px` for progressively
tighter mobile layouts. Reasonable coverage of common device widths with no
large unhandled gap. **Not verifiable here**: actual rendered layout at each
breakpoint — recommend a real-device or browser-devtools pass, especially
around the 1099/1100px nav-switch boundary and the mega-menu dropdowns on
touch devices (hover-dependent submenus are a common mobile-usability gap —
worth specifically confirming the caret-button tap-to-toggle path works, since
`nav.js`'s `nav-item__caret` buttons suggest this was already considered, but
it's worth a real-device confirmation).

### 7. Code quality — dead/orphaned files found

| File | Status |
|---|---|
| `assets/js/mfd-tools.js` (14 KB) | **Orphaned** — not `<script src>`'d by any `.html` file in this project (`index.html`, `partner-info.html`, `ENTERPRISE-REVIEW.html`) |
| `assets/css/mfd-tools.css` (3.5 KB) | **Orphaned** — same, no page references it |
| `assets/js/testimonials-data.js` (2.8 KB) | **Orphaned** — `index.html` has a comment explicitly noting *"testimonials-data.js is no longer loaded here"*; confirmed no other page loads it either |

None of these affect the live site (unused files aren't fetched by a browser
that never gets a `<script src>` pointing at them), so this isn't a
functional bug — but ~20 KB of dead code sitting in the deployed `assets/`
folder is worth either removing or, if `mfd-tools.js`/`.css` belong to a page
that hasn't been built yet, moving to a clearly-marked `wip/` location so a
future contributor doesn't wonder whether it's safe to delete.

### 8. Robustness of DOM-dependent JS — PASS

Every `document.getElementById(...).property` / `querySelector(...).method`
chain found across all JS files that don't first check for `null` was traced
back to its actual `id`/selector in the page that loads it, and confirmed
present:
- `calculators.js`'s `heroAmountOut`/`heroYearsOut`/etc. → present in
  `index.html`'s hero section.
- `main.js`'s `year` → present in the footer.
- `reveal.js`'s `statYears`/`statFamilies`/`statAum` → present.
- `mfd-tools.js`'s DOM lookups (`pdfType`, `singleModeBlock`, etc.) are moot
  since the file isn't loaded anywhere (see §7) — would throw if it ever were,
  but currently can't run.

No "assumes an element exists but it doesn't" bugs found in the code paths
that actually execute today.

## Defects found (all Low/Informational — no functional bugs)

| # | Severity | Finding | File(s) |
|---|---|---|---|
| 1 | Low | 3 orphaned/dead asset files (~20 KB, unused) | `mfd-tools.js`, `mfd-tools.css`, `testimonials-data.js` |
| 2 | Informational | Verbose `console.log` calls left in `contact-form.js` (11 log statements) — intentional per the file's own comments (helps debug the "silent failure" case), not a bug, but worth a build-time strip if minification is ever introduced | `contact-form.js` |

No Medium/High/Critical defects found in this pass. The two items above are
cleanup, not correctness issues — the site's actual user-facing functionality
(navigation, forms, responsive layout, accessibility structure) all passed.

## What this report does NOT cover (explicitly, so it isn't assumed clean)

- Live network reachability of the two form endpoints (Apps Script, backoffice)
- Real rendered visual QA (layout, color contrast, animation smoothness)
- Cross-browser compatibility (only static code was reviewed, not actual
  engine behavior differences)
- Screen-reader / keyboard-only navigation walkthrough
- Automated accessibility scoring (axe/WAVE/Lighthouse)
- Load/performance testing (see `PERFORMANCE-CAPACITY-SLA-REVIEW.md` for what
  *is* covered there, and its own explicit limitations)

## Recommendation

Safe to consider this a **pass** for structural correctness, internal link
integrity, form wiring, and accessibility basics. Before calling the site
fully production-validated, run one real-browser pass covering the items in
"What this report does NOT cover" above — none of them turned up as
suspicious in the code, but none of them can be confirmed without an actual
browser, which isn't available in this environment.
