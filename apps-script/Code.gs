const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
const SHEET_NAME = "Signups";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error('No sheet named "' + SHEET_NAME + '".');
    }

    const data = JSON.parse(e.postData.contents);
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !email) {
      return json_({ ok: false, error: "Name and email are required." });
    }

    sheet.appendRow([new Date(), name, email, message]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput("CIM join form endpoint is live.");
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
