# Deploying the call-back handler (novice-friendly, ~5 minutes)

This connects the website's "Request a call back" form to your Google
Sheet and to an email notification. It's a one-time setup — after this,
every submission just works.

## 1. Open the spreadsheet's script editor

1. Open the sheet: https://docs.google.com/spreadsheets/d/1lb_p2AS7d66OWIDdnMCMMVucHaPWDquwjsgtaPUErwk/edit
2. Menu bar → **Extensions → Apps Script**. A new tab opens with a code editor.

## 2. Paste the script

1. In the code editor, select all the default starter code (`Ctrl+A`) and delete it.
2. Open `callback-handler.gs` (in this same folder) and copy its entire contents.
3. Paste into the Apps Script editor.
4. Click the disk icon (or `Ctrl+S`) to save. Give the project any name, e.g. "VFS Callback Handler".

## 3. (Optional but recommended) Test it first

1. In the toolbar dropdown that says a function name, select **testDoPost**.
2. Click **Run** (▶).
3. The first time, Google will ask you to authorize — click **Review permissions**, choose your account, click **Advanced**, then **Go to VFS Callback Handler (unsafe)**, then **Allow**. This warning is normal for your own scripts — it's not a real risk, Google just can't "verify" personal projects.
4. Check the spreadsheet — a new "Leads" tab should appear with one test row. Check the inbox for `vemurifin@gmail.com` — you should have a test email.
5. Delete the test row from the sheet once confirmed.

## 4. Deploy as a Web App

1. Top-right **Deploy** button → **New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description:** Callback form handler
   - **Execute as:** Me (your account)
   - **Who has access:** **Anyone**  ← important, this must be "Anyone", not "Anyone with Google account" or "Only myself", or the website won't be able to reach it.
4. Click **Deploy**.
5. It will ask you to authorize again (same as step 3) — approve it.
6. Copy the **Web app URL** shown (it ends in `/exec`). This is the address the website will send form submissions to.

## 5. Wire it into the website

1. Open `assets/js/contact-form.js`.
2. Find the line near the top:
   ```js
   ENDPOINT: 'PASTE_YOUR_DEPLOYED_WEB_APP_URL_HERE',
   ```
3. Replace the placeholder with the URL you copied, keeping the quotes:
   ```js
   ENDPOINT: 'https://script.google.com/macros/s/AKfyc.../exec',
   ```
4. Save. Reload the site and submit a test entry through the actual form — confirm a row appears in the sheet and an email arrives.

## If you ever edit the script later

Apps Script deployments are frozen to whatever code existed when you
deployed — editing `callback-handler.gs` in the editor and saving does
**not** update the live URL. To push a change live:

1. **Deploy → Manage deployments**.
2. Click the pencil (edit) icon on the existing deployment.
3. Under **Version**, choose **New version**.
4. Click **Deploy**.

The URL stays the same — no need to update `contact-form.js` again
unless you create a brand new deployment instead of a new version.

## Troubleshooting

- **Form shows "Something went wrong"**: the `ENDPOINT` in `contact-form.js` is still the placeholder, or the deployment's "Who has access" isn't set to "Anyone".
- **No email arriving**: check spam folder first; confirm `NOTIFY_EMAIL` in the script matches `vemurifin@gmail.com` exactly.
- **Works when deployed but not when double-clicking index.html locally**: expected — Apps Script (like any real backend) requires the page to be served over http(s), not opened as a local file. Test via `DEPLOYMENT.md`'s local server instructions, or just test after deploying.
