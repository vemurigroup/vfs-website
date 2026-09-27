// Shared anchor-scroll helper. The header is `position: fixed` and its real
// height varies a lot by breakpoint (~65px on mobile vs ~105px on desktop,
// where the logo grows and a login row appears) — a hardcoded offset tuned
// for one breakpoint is wrong on the other, so this reads the header's
// actual rendered height at call time instead.
const EXTRA_GAP = 16

export function getHeaderOffset() {
  const header = document.querySelector('header')
  return (header ? header.getBoundingClientRect().height : 0) + EXTRA_GAP
}

export function scrollToId(id, behavior = 'smooth') {
  const targetId = id.startsWith('#') ? id.slice(1) : id
  const el = document.getElementById(targetId)
  if (!el) return false
  const y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
  window.scrollTo({ top: Math.max(y, 0), behavior })
  return true
}
