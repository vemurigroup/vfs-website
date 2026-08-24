// Mobile navigation. Replaces the original's `nav.style.display =
// innerWidth > 900 ? 'flex' : 'none'`, which hid all nav links below 900px
// with no replacement — Plan/Services/Tools/Compare/Legal were unreachable
// on any phone. This adds a real hamburger toggle with ARIA state.
'use strict';

const Nav = {
  init() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;

    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const open = () => {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', () => {
      nav.classList.contains('is-open') ? close() : open();
    });

    // Services submenu: click/tap the caret to toggle (works for
    // keyboard and touch, where the CSS :hover reveal doesn't apply).
    // Submenu links close the whole mobile nav on click, same as any
    // other nav link — handled by the generic `nav a` listener below.
    nav.querySelectorAll('.nav-item--has-sub').forEach((item) => {
      const caret = item.querySelector('.nav-item__caret');
      if (!caret) return;
      const closeSub = () => {
        item.classList.remove('nav-item--open');
        caret.setAttribute('aria-expanded', 'false');
      };
      caret.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = item.classList.toggle('nav-item--open');
        caret.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      document.addEventListener('click', (e) => {
        if (!item.contains(e.target)) closeSub();
      });
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
    });

    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) close();
    });
  }
};
