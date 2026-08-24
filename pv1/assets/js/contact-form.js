// "Request a call back" form. Validation ported from the original
// Component's onSubmit (index.html). Fix: the original never sent the
// lead anywhere — it just showed a "thanks" message and discarded the
// data.
//
// BACKEND: POSTs to a Google Apps Script Web App bound to the lead
// spreadsheet — it appends a row to the sheet AND emails a copy to
// SiteConfig.email. Source + deployment steps are in
// google-apps-script/callback-handler.gs and DEPLOY-STEPS.md.
//
// This needs a ONE-TIME manual deployment step from the spreadsheet
// owner (I can't deploy Apps Script into someone else's Google account)
// — until ENDPOINT below is replaced with the real deployed URL, this
// form cannot submit anywhere and will show a configuration error
// rather than silently failing.
'use strict';

const ContactForm = {
  ENDPOINT: 'https://script.google.com/macros/s/AKfycbzQTI70FJ0lqLW-rhOpVaiixaT9fK5gooP05-YkYFBsE-BvSIOZhK77yt-py3o7tkXT/exec',

  isConfigured() {
    return /^https:\/\/script\.google(usercontent)?\.com\//.test(this.ENDPOINT);
  },

  async submitLead(payload) {
    const log = (...args) => console.log('[contact-form]', ...args);
    log('submitting to', this.ENDPOINT);
    log('payload', payload);

    let res;
    try {
      res = await fetch(this.ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (networkErr) {
      // fetch() itself rejects (not a bad HTTP status) when the request
      // never completes at all: DNS failure, offline, CORS preflight
      // rejected, mixed-content block, or the browser refusing the
      // request outright. This is the "silent failure" case — log
      // everything we can to tell it apart from a normal HTTP error.
      log('fetch() threw before getting any response — network/CORS/offline issue:', networkErr);
      log('page origin:', window.location.origin || '(none — likely file:// or opaque origin)');
      log('page protocol:', window.location.protocol);
      throw networkErr;
    }

    log('response received: status', res.status, res.statusText, 'redirected:', res.redirected, 'final URL:', res.url);
    log('response headers:', [...res.headers.entries()]);

    const rawText = await res.clone().text();
    log('raw response body:', rawText);

    if (!res.ok) {
      throw new Error('Request failed with status ' + res.status + ' — response body: ' + rawText.slice(0, 300));
    }

    try {
      const json = await res.json();
      log('parsed JSON response:', json);
      if (json.status !== 'ok') {
        throw new Error('Script returned an error: ' + (json.message || JSON.stringify(json)));
      }
      return json;
    } catch (parseErr) {
      // A 200 status with unparseable body means the Apps Script
      // exec URL served something other than our JSON — usually an
      // Apps Script permissions/auth page or a stale deployment.
      log('Could not parse response as JSON. This usually means the Apps Script deployment needs re-authorizing, or the /exec URL is serving an old deployment. parseErr:', parseErr);
      throw new Error('Server responded but not with the expected data — see console for the raw response.');
    }
  },

  init() {
    const form = document.getElementById('callbackForm');
    const thanksBlock = document.getElementById('thanksBlock');
    const hint = document.getElementById('formHint');
    const submitBtn = document.getElementById('formSubmit');
    const resetBtn = document.getElementById('formReset');
    const thanksTitle = document.getElementById('thanksTitle');
    if (!form) return;

    const DEFAULT_HINT = 'No spam, no drip campaign. One call, then you decide.';

    const setHint = (msg, isError) => {
      hint.textContent = msg;
      hint.classList.toggle('is-error', Boolean(isError));
    };

    setHint(DEFAULT_HINT, false);

    console.log('[contact-form] init() ran, form found, ENDPOINT configured:', this.isConfigured(), this.ENDPOINT);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('[contact-form] submit event fired');

      const name = form.elements.name.value.trim();
      const phone = form.elements.phone.value;
      const digits = phone.replace(/\D/g, '');

      if (!name) {
        console.log('[contact-form] validation failed: no name');
        setHint('We need a name to ask for on the call.', true);
        return;
      }
      if (digits.length < 10) {
        console.log('[contact-form] validation failed: phone digits =', digits.length);
        setHint('That phone number looks short — 10 digits please.', true);
        return;
      }
      if (!form.elements.consent.checked) {
        console.log('[contact-form] validation failed: consent not checked');
        setHint('Please confirm you agree to be contacted before submitting.', true);
        return;
      }

      if (!this.isConfigured()) {
        setHint('This form isn’t connected yet — see google-apps-script/DEPLOY-STEPS.md to finish setup, or call/email us directly using the details on this page.', true);
        console.error('[contact-form] ContactForm.ENDPOINT is still the placeholder — deploy google-apps-script/callback-handler.gs and paste the Web App URL in. See google-apps-script/DEPLOY-STEPS.md.');
        return;
      }

      const payload = {
        name,
        phone,
        email: form.elements.email.value.trim(),
        goal: form.elements.goal.value,
        message: form.elements.message.value.trim()
      };

      submitBtn.disabled = true;
      setHint('Sending…', false);

      try {
        await this.submitLead(payload);
        console.log('[contact-form] submit succeeded');
        form.classList.add('is-hidden');
        thanksBlock.classList.add('is-active');
        thanksTitle.textContent = name ? 'Got it, ' + name.split(' ')[0] + '.' : 'Got it.';
      } catch (err) {
        // Surface the real reason in the visible hint too, not just the
        // console — most people testing this won't have devtools open.
        setHint('Send failed: ' + (err && err.message ? err.message : 'unknown error') + ' — please try again, or call/email us directly.', true);
        console.error('[contact-form] submit failed:', err);
      } finally {
        submitBtn.disabled = false;
      }
    });

    resetBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('is-hidden');
      thanksBlock.classList.remove('is-active');
      setHint(DEFAULT_HINT, false);
    });
  }
};
