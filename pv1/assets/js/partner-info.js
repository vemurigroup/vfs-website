// Partner Info hub — internal reference page (portal links, RM contacts,
// AMC directory, WhatsApp message templates). Ported from the original
// vfs-website/partner-info.html, restyled to the v2 design system.
// Depends on SiteConfig (assets/js/config.js) for default RM contact
// details, loaded before this file.
'use strict';

const PartnerHub = {
  // Per-AMC portal URL, plus an email override for the two AMCs that
  // don't use the shared inbox. Name/mobile default to SiteConfig;
  // email defaults to SiteConfig.email unless overridden below.
  amcLinks: {
    'HDFC Mutual Fund': { url: 'https://www.hdfcfund.com/' },
    'SBI Mutual Fund': { url: 'https://www.sbimf.com/' },
    'ICICI Prudential AMC': { url: 'https://www.icicipruamc.com/' },
    'Nippon India AMC': { url: 'https://www.nipponindiaim.com/' },
    'Axis Mutual Fund': { url: 'https://www.axismf.com/' },
    'Kotak Mutual Fund': { url: 'https://www.kotakmf.com/' },
    'Aditya Birla Sun Life AMC': { url: 'https://abslmfpartner.abslamc.com/ifa/' },
    'UTI Mutual Fund': { url: 'https://www.utimf.com/' },
    'DSP Mutual Fund': { url: 'https://www.dspim.com/' },
    'Tata Mutual Fund': { url: 'https://www.tatamutualfund.com/' },
    'Mirae Asset Mutual Fund': { url: 'https://www.miraeassetmf.co.in/' },
    'Franklin Templeton': { url: 'https://www.franklintempletonindia.com/' },
    'Canara Robeco Mutual Fund': { url: 'https://www.canararobeco.com/' },
    'HSBC Mutual Fund': { url: 'https://www.assetmanagement.hsbc.co.in/' },
    'IDBI Mutual Fund': { url: 'https://www.idbimutual.co.in/' },
    'Invesco Mutual Fund': { url: 'https://www.invescomutualfund.com/' },
    'LIC Mutual Fund': { url: 'https://www.licmf.com/' },
    'Mahindra Manulife Mutual Fund': { url: 'https://www.mahindramanulife.com/' },
    'Motilal Oswal Mutual Fund': { url: 'https://www.motilaloswalmf.com/' },
    'NJ Mutual Fund': { url: 'https://www.njindiaonline.in/' },
    'PPFAS Mutual Fund': { url: 'https://www.ppfas.com/' },
    'Quant Mutual Fund': { url: 'https://www.quantmutual.com/' },
    'Sundaram Mutual Fund': { url: 'https://www.sundarammutual.com/' },
    'Union Mutual Fund': { url: 'https://www.unionmf.com/' },
    'Baroda BNP Paribas Mutual Fund': { url: 'https://www.barodabnpparibasmf.in/' },
    'Edelweiss Mutual Fund': { url: 'https://www.edelweissmf.com/' },
    'IDFC FIRST Mutual Fund': { url: 'https://www.idfcfirstmf.com/' },
    'Bank Of India Mutual Fund': { url: 'https://www.bankofindiamutualfund.com/' },
    'Shriram Mutual Fund': { url: 'https://www.shrirammf.com/' },
    'Bandhan Mutual Fund': { url: 'https://www.bandhanmutual.com/' },
    'Groww Mutual Fund': { url: 'https://groww.in/mutual-funds' },
    'Zerodha Mutual Fund': { url: 'https://zerodhafundhouse.com/' },
    'Navi Mutual Fund': { url: 'https://www.navimutualfund.com/' },
    'Samco Mutual Fund': { url: 'https://partners.samcomf.com/login' },
    'JM Financial Mutual Fund': { url: 'https://www.jmfinancialmf.com/' },
    'JIO Mutual Fund': { url: 'https://www.jiofinance.com/' },
    'ITI Mutual Fund': { url: 'https://www.itimutualfund.com/' },
    'Quantum Mutual Fund': { url: 'https://www.quantumamc.com/' },
    'Trust Mutual Fund': { url: 'https://www.trustmf.com/' },
    'WhiteOak Capital Mutual Fund': { url: 'https://www.whiteoakamc.com/' },
    'PGIM India Mutual Fund': { url: 'https://www.pgimindiamf.com/' },
    'Bajaj Finserv Mutual Fund': { url: 'https://www.bajajfinserv.in/finance/mutual-funds' },
    'Helios Mutual Fund': { url: 'https://www.heliosmf.com/' },
    'Nuvama Asset Management': { url: 'https://www.nuvamawealth.com/' },
    '360 ONE Asset Management': { url: 'https://edge360.camsonline.com/signin' },
    'PPFAS Asset Management': { url: 'https://partners.ppfas.com/dashboard' },
    'AlphaGrep Asset Management': { url: 'https://www.alphagrep.com/' },
    'Sundaram Asset Management': { url: 'https://www.sundarammutual.com/' },
    'WhiteOak Capital AMC': { url: 'https://www.whiteoakamc.com/' },
    'Monarch Mutual Fund': { url: 'https://monarchamc.in/', email: 'Amc.compliance@monarchamc.in' },
    'ASK Mutual Fund': { url: 'https://askmutualfund.com', email: 'compliance@askmutualfund.com' },
    'Lakshya Asset Management': { url: 'https://lakshyafunds.com/' }
  },

  initRmToggle() {
    const toggle = document.getElementById('rmToggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const isVisible = toggle.getAttribute('data-visible') === 'true';
      document.querySelectorAll('.hub-rm-details').forEach((el) => el.classList.toggle('is-visible', !isVisible));
      document.querySelectorAll('.is-connect').forEach((el) => el.classList.toggle('is-visible', !isVisible));
      toggle.setAttribute('data-visible', String(!isVisible));
      toggle.textContent = isVisible ? 'Show RM details' : 'Hide RM details';
    });
  },

  initModal() {
    const overlay = document.getElementById('hubModal');
    const closeBtn = document.getElementById('hubModalClose');
    const title = document.getElementById('hubModalTitle');
    const message = document.getElementById('hubModalMessage');
    const phoneLink = document.getElementById('hubModalPhone');
    const emailLink = document.getElementById('hubModalEmail');
    if (!overlay) return;

    this.openModal = (name, phone, email) => {
      title.textContent = name + ' — Contact';
      message.textContent = 'Use the details below to connect with the RM team.';
      phoneLink.href = 'tel:' + phone;
      phoneLink.textContent = '📞 ' + phone;
      emailLink.href = 'mailto:' + email;
      emailLink.textContent = '✉️ ' + email;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
  },

  initAmcDirectory() {
    const section = document.getElementById('amcSection');
    const toggle = document.getElementById('amcToggle');
    const grid = section && section.querySelector('.amc-grid');
    if (!section || !grid) return;

    if (toggle) {
      toggle.addEventListener('click', () => {
        const isVisible = toggle.getAttribute('data-visible') === 'true';
        section.classList.toggle('is-collapsed', isVisible);
        toggle.setAttribute('data-visible', String(!isVisible));
        toggle.textContent = isVisible ? 'Show AMC list' : 'Hide AMC list';
      });
    }

    grid.querySelectorAll('.hub-card').forEach((card) => {
      const nameEl = card.querySelector('h3');
      const name = nameEl ? nameEl.textContent.trim() : '';
      const amc = this.amcLinks[name];
      if (!amc) return;

      const rmName = amc.rmName || SiteConfig.businessName + ' Team';
      const rmMobile = amc.mobile || SiteConfig.phoneDisplay;
      const rmEmail = amc.email || SiteConfig.email;

      const details = document.createElement('p');
      details.className = 'hub-meta hub-rm-details';
      details.innerHTML = '<strong>RM Name:</strong> ' + rmName + '<br><strong>Mobile:</strong> ' + rmMobile + '<br><strong>Email:</strong> ' + rmEmail;
      card.appendChild(details);

      const links = document.createElement('div');
      links.className = 'hub-links';

      const connectBtn = document.createElement('button');
      connectBtn.type = 'button';
      connectBtn.className = 'hub-chip is-connect';
      connectBtn.textContent = '📞 Connect';
      connectBtn.addEventListener('click', () => this.openModal(name, rmMobile, rmEmail));
      links.appendChild(connectBtn);

      const visit = document.createElement('a');
      visit.className = 'hub-chip';
      visit.href = amc.url;
      visit.target = '_blank';
      visit.rel = 'noopener noreferrer';
      visit.textContent = 'Visit site';
      links.appendChild(visit);

      card.appendChild(links);
    });

    const sorted = Array.from(grid.querySelectorAll('.hub-card')).sort((a, b) => {
      const nameA = (a.querySelector('h3')?.textContent || '').trim().toLowerCase();
      const nameB = (b.querySelector('h3')?.textContent || '').trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
    sorted.forEach((card) => grid.appendChild(card));
  },

  // Message templates (below) hold the phone/email as plain text inside
  // <textarea> blocks, not as data-cfg elements — ConfigApply.init() can't
  // reach into freeform copy. Sync them here so a SiteConfig change
  // doesn't leave stale contact details in client-facing WhatsApp
  // templates. Uses the values baked into the HTML as the "old" anchor to
  // replace, so this is a no-op until config.js is actually edited.
  syncTemplateContactDetails() {
    const OLD_PHONE = '9886291668';
    const OLD_EMAIL = 'vemurifin@gmail.com';
    const phoneOk = ConfigApply.isValidPhoneDigits(SiteConfig.phoneDigits);
    const emailOk = ConfigApply.isValidEmail(SiteConfig.email);
    const newPhone = phoneOk ? SiteConfig.phoneDigits.slice(-10) : OLD_PHONE;
    const newEmail = emailOk ? SiteConfig.email : OLD_EMAIL;
    if (newPhone === OLD_PHONE && newEmail === OLD_EMAIL) return;

    document.querySelectorAll('textarea[id]').forEach((ta) => {
      let value = ta.value;
      if (newPhone !== OLD_PHONE) value = value.split(OLD_PHONE).join(newPhone);
      if (newEmail !== OLD_EMAIL) value = value.split(OLD_EMAIL).join(newEmail);
      ta.value = value;
    });
  },

  initTemplates() {
    document.querySelectorAll('[data-edit-target]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = document.getElementById(button.getAttribute('data-edit-target'));
        if (!target) return;
        target.removeAttribute('readonly');
        target.focus();
        target.setSelectionRange(target.value.length, target.value.length);
        button.textContent = 'Editing';
      });
    });

    document.querySelectorAll('[data-copy-target]').forEach((button) => {
      button.addEventListener('click', async () => {
        const target = document.getElementById(button.getAttribute('data-copy-target'));
        if (!target) return;
        const originalText = button.textContent;

        try {
          await navigator.clipboard.writeText(target.value);
        } catch (err) {
          target.removeAttribute('readonly');
          target.select();
          document.execCommand('copy');
        }

        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = originalText; }, 1500);
      });
    });
  },

  init() {
    ConfigApply.init();
    this.syncTemplateContactDetails();
    this.initRmToggle();
    this.initModal();
    this.initAmcDirectory();
    this.initTemplates();
  }
};

document.addEventListener('DOMContentLoaded', () => PartnerHub.init());
