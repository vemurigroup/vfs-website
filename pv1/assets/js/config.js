// Single source of truth for business contact details. Change values
// here — everything tagged with data-cfg="..." in index.html/partner-
// info.html (and any script that reads SiteConfig, e.g. contact-form.js)
// picks it up automatically on page load. No need to hunt through the
// HTML.
//
// NOT covered here, and must be edited by hand in each page's <head> if
// the business name/email/phone ever change: <title>, <meta
// name="description">, og:*/twitter:* tags, and the JSON-LD
// FinancialService block. Those are read by search engines and social
// crawlers before this script runs (some crawlers don't run JS at all),
// so rewriting them client-side would either be invisible to crawlers or
// briefly show stale content — worse than just keeping them accurate in
// the HTML source.
'use strict';

const SiteConfig = {
  businessName: 'Vemuri Financial Services',
  address: 'Corporate Office: ITI Colony, Bangalore - 560016',
  email: 'vemurifin@gmail.com',
  phoneDisplay: '+91 98862 91668',
  phoneDigits: '919886291668',

  // Official broadcast-only WhatsApp Channel (distinct from the wa.me
  // 1:1 chat link above) — see the "Community" section on index.html.
  whatsappChannelUrl: 'https://whatsapp.com/channel/0029VawYVDfIN9iib7c6Bl3v',

  // The ONE place this site knows the backoffice app exists. vfs-website
  // and backoffice/ are independently deployable — backoffice carries its
  // own copy of every asset it needs (see backoffice/assets/) and has no
  // filesystem/URL dependency back on this site. This site still LINKS to
  // the backoffice (login button, pricing page, testimonials feed) and
  // that's the one remaining coupling point, entirely captured here.
  // backoffice/ is now the standalone vfsoffice project, not a
  // sibling folder of this repo — this is an absolute cross-origin URL.
  // Set to the local XAMPP test server for now; MUST be changed to the
  // real production URL (e.g. 'https://backoffice.vemurigroup.in') before
  // this site goes live — see vfsoffice/config.php's
  // cors_allowed_origins, which must list whichever origin this points
  // to, and keep both on the same registrable domain (the session cookie
  // is SameSite=Lax — see testimonials.js's fetch() calls).
  backofficeBaseUrl: 'https://localhost/vfsoffice',

  // Regulatory registration details — leave any of these '' until you
  // have the real value; the matching data-cfg clause below simply
  // omits itself rather than showing a placeholder. Fill in here
  // (single source of truth, same as the fields above) once you have
  // the paperwork — no other file needs to change.
  arnValidTill: '',      // e.g. '31 Mar 2027' — AMFI ARN renewal date
  irdaiRegNo: '',        // e.g. 'CA0123456'
  irdaiValidTill: '',    // e.g. '31 Mar 2027'
  pfrdaPopRegNo: ''      // PFRDA Point of Presence registration number
};

const ConfigApply = {
  // Safety net: if someone edits SiteConfig above and leaves phoneDigits
  // with spaces/dashes/a country-code "+", or email without an "@", every
  // tel:/wa.me/mailto: link on the page would silently break. Validate
  // once here and fall back to whatever was already hand-written in the
  // HTML (i.e. do nothing) rather than writing a broken href over a
  // working one.
  isValidPhoneDigits(v) { return typeof v === 'string' && /^\d{10,15}$/.test(v); },
  isValidEmail(v) { return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },

  init() {
    const phoneOk = this.isValidPhoneDigits(SiteConfig.phoneDigits);
    const emailOk = this.isValidEmail(SiteConfig.email);
    if (!phoneOk) console.warn('SiteConfig.phoneDigits is not 10-15 plain digits — phone/WhatsApp links left as-is in the HTML.');
    if (!emailOk) console.warn('SiteConfig.email does not look like a valid address — email links left as-is in the HTML.');

    document.querySelectorAll('[data-cfg]').forEach((el) => {
      const kind = el.dataset.cfg;
      if (kind === 'business-name') el.textContent = SiteConfig.businessName;
      else if (kind === 'business-name-alt') el.alt = SiteConfig.businessName;
      else if (kind === 'address-text') el.textContent = SiteConfig.address;
      else if (kind === 'email-text' && emailOk) el.textContent = SiteConfig.email;
      else if (kind === 'email-link' && emailOk) { el.href = 'mailto:' + SiteConfig.email; }
      else if (kind === 'phone-text' && phoneOk) el.textContent = SiteConfig.phoneDisplay;
      else if (kind === 'phone-link' && phoneOk) { el.href = 'tel:+' + SiteConfig.phoneDigits; }
      else if (kind === 'whatsapp-link' && phoneOk) { el.href = 'https://wa.me/' + SiteConfig.phoneDigits; }
      else if (kind === 'whatsapp-channel-link') { el.href = SiteConfig.whatsappChannelUrl; }
      else if (kind === 'backoffice-link') {
        const path = el.dataset.cfgPath || '';
        el.href = SiteConfig.backofficeBaseUrl.replace(/\/$/, '') + (path ? '/' + path.replace(/^\//, '') : '');
      }
      else if (kind === 'arn-valid-till') el.textContent = SiteConfig.arnValidTill ? (' valid till ' + SiteConfig.arnValidTill + '.') : '.';
      else if (kind === 'irdai-reg-no') el.textContent = SiteConfig.irdaiRegNo ? ('Reg. No. ' + SiteConfig.irdaiRegNo + (SiteConfig.irdaiValidTill ? ', valid till ' + SiteConfig.irdaiValidTill : '') + '.') : 'Registration details available on request.';
      else if (kind === 'pfrda-pop-reg-no') el.textContent = SiteConfig.pfrdaPopRegNo ? ('POP Reg. No. ' + SiteConfig.pfrdaPopRegNo + '.') : 'Registration details available on request.';
    });
  }
};
