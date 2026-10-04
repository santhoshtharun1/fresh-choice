/**
 * Fresh Choice – website log
 * Paste into the Google Sheet: Extensions → Apps Script. Setup steps are in the README.
 * Rows arrive from the website's /api/log route. Orders and bulk quotes include the customer's
 * name, phone and address: keep this sheet shared only with the team.
 */

// Must match SHEET_WEBHOOK_TOKEN in Vercel exactly.
const TOKEN = 'PASTE-THE-SECRET-TOKEN-HERE';

const LABELS = {
  order_sent: 'Order',
  quick_order_sent: 'Quick order',
  bulk_quote_sent: 'Bulk quote',
  whatsapp_chat: 'WhatsApp chat',
  call_click: 'Call',
  directions_click: 'Directions',
};

const TABS = {
  Enquiries: {
    events: Object.keys(LABELS),
    headers: ['Time', 'Type', 'Ref', 'Products', 'Size', 'Qty / items', 'Total (₹)', 'Delivery', 'Payment', 'Tapped from / type', 'Page', 'Device', 'Customer name', 'Phone', 'Address / area', 'Business'],
    row: (r, t) => [t, LABELS[r.event], r.ref, r.products, r.size, r.qty, r.total, r.delivery, r.payment, r.from, r.page, r.device, r.name, r.phone, r.address, r.business],
  },
  Visits: {
    events: ['visit'],
    headers: ['Time', 'Landing page', 'Came from', 'Device'],
    row: (r, t) => [t, r.page, r.referrer || 'Direct / WhatsApp app', r.device],
  },
  'Added to list': {
    events: ['add_to_list'],
    headers: ['Time', 'Product', 'Size', 'Device'],
    row: (r, t) => [t, r.products, r.size, r.device],
  },
};

function doPost(e) {
  let r;
  try {
    r = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply('bad request');
  }
  if (r.token !== TOKEN) return reply('denied');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const now = new Date();
    Object.keys(TABS).forEach((name) => {
      const tab = TABS[name];
      if (tab.events.indexOf(r.event) !== -1) sheet(name, tab.headers).appendRow(tab.row(r, now));
    });
  } finally {
    lock.releaseLock();
  }
  return reply('ok');
}

// Run from the editor (select "setup" → Run) to create the tabs and the Summary.
// Safe to run again after updating this script: it refreshes the header rows, keeps all data.
function setup() {
  Object.keys(TABS).forEach((name) => {
    const headers = TABS[name].headers;
    const sh = sheet(name, headers);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  });
  // Keep phone numbers as text so Sheets doesn't turn them into numbers
  sheet('Enquiries', TABS.Enquiries.headers).getRange('N:N').setNumberFormat('@');
  const ss = SpreadsheetApp.getActive();
  const s = ss.getSheetByName('Summary') || ss.insertSheet('Summary', 0);
  s.clear();
  const type = (label) => `COUNTIFS(Enquiries!B2:B,"${label}"`;
  const rows = [
    ['', 'Today', 'Last 7 days', 'All time'],
    ['Visits', '=COUNTIFS(Visits!A2:A,">="&TODAY())', '=COUNTIFS(Visits!A2:A,">="&TODAY()-6)', '=COUNTA(Visits!A2:A)'],
    ['Orders sent', `=${type('Order')},Enquiries!A2:A,">="&TODAY())`, `=${type('Order')},Enquiries!A2:A,">="&TODAY()-6)`, `=${type('Order')})`],
    ['Order value (₹)', '=SUMIFS(Enquiries!G2:G,Enquiries!B2:B,"Order",Enquiries!A2:A,">="&TODAY())', '=SUMIFS(Enquiries!G2:G,Enquiries!B2:B,"Order",Enquiries!A2:A,">="&TODAY()-6)', '=SUMIFS(Enquiries!G2:G,Enquiries!B2:B,"Order")'],
    ['Quick orders', `=${type('Quick order')},Enquiries!A2:A,">="&TODAY())`, `=${type('Quick order')},Enquiries!A2:A,">="&TODAY()-6)`, `=${type('Quick order')})`],
    ['Bulk quotes', `=${type('Bulk quote')},Enquiries!A2:A,">="&TODAY())`, `=${type('Bulk quote')},Enquiries!A2:A,">="&TODAY()-6)`, `=${type('Bulk quote')})`],
    ['WhatsApp chats', `=${type('WhatsApp chat')},Enquiries!A2:A,">="&TODAY())`, `=${type('WhatsApp chat')},Enquiries!A2:A,">="&TODAY()-6)`, `=${type('WhatsApp chat')})`],
    ['Calls', `=${type('Call')},Enquiries!A2:A,">="&TODAY())`, `=${type('Call')},Enquiries!A2:A,">="&TODAY()-6)`, `=${type('Call')})`],
    ['Directions', `=${type('Directions')},Enquiries!A2:A,">="&TODAY())`, `=${type('Directions')},Enquiries!A2:A,">="&TODAY()-6)`, `=${type('Directions')})`],
  ];
  s.getRange(1, 1, rows.length, 4).setValues(rows);
  s.getRange(1, 1, 1, 4).setFontWeight('bold');
  s.getRange(1, 1, rows.length, 1).setFontWeight('bold');
  s.setColumnWidth(1, 160);
}

function sheet(name, headers) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sh.getRange('A:A').setNumberFormat('dd-mmm-yyyy hh:mm');
  }
  return sh;
}

function reply(text) {
  return ContentService.createTextOutput(text);
}
