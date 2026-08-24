// Google Apps Script — handles "Request a call back" submissions from
// v2/index.html. Appends each lead as a row to this spreadsheet AND
// emails a copy to NOTIFY_EMAIL.
//
// This file is a reference copy for version control — Apps Script does
// not run .gs files directly from disk. See DEPLOY-STEPS.md in this
// folder for exactly how to paste this into script.google.com, bound
// to the spreadsheet at:
//   https://docs.google.com/spreadsheets/d/1lb_p2AS7d66OWIDdnMCMMVucHaPWDquwjsgtaPUErwk/edit
//
// After deploying, paste the resulting Web App URL into
// v2/assets/js/contact-form.js (the ENDPOINT constant).

const SHEET_NAME = 'Leads';
const NOTIFY_EMAIL = 'vemurifin@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    appendToSheet(data);
    sendNotificationEmail(data);

    return jsonResponse({ status: 'ok' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err) });
  }
}

function appendToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Interested in', 'Message']);
  }

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.goal || '',
    data.message || ''
  ]);
}

function sendNotificationEmail(data) {
  const body = [
    'New call-back request from the website:',
    '',
    'Name: ' + (data.name || '-'),
    'Phone: ' + (data.phone || '-'),
    'Email: ' + (data.email || '-'),
    'Interested in: ' + (data.goal || '-'),
    'Message: ' + (data.message || '-'),
    '',
    'Also saved to the "Leads" sheet.'
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New call-back request — ' + (data.name || 'Website lead'),
    body: body
  });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Lets you sanity-check the script from the Apps Script editor itself
// (Run > testDoPost) before deploying — writes one test row and sends
// one test email.
function testDoPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'Test Lead',
        phone: '9886291668',
        email: 'test@example.com',
        goal: 'Starting my first SIP',
        message: 'This is a test row from testDoPost().'
      })
    }
  };
  Logger.log(doPost(fakeEvent).getContent());
}
