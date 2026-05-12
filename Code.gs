//  CONFIG (centralized, no scattered hardcoding)
const CONFIG = {
  parentFolderId: "1TJ-kOm-Y0SQhK-Y7r9Zq-nN9BdC36MpT",
  templateId: "1JMLNfmMk2aRbiMdal6w5RvF1G03QOTBFt63mMXfUHhM",
  targetCurrency: "INR"
};


//  Currency API
function getConversionRate(from, to) {
  try {
    if (from === to) return 1;

    const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());

    if (!data || !data.rates || !data.rates[to]) {
      throw new Error("Invalid API response");
    }

    return data.rates[to];

  } catch (e) {
    Logger.log("Currency API Error: " + e.message);
    return 1; // safe fallback
  }
}


//  Get or Create Client Folder
function getClientFolder(clientName) {
  const parent = DriveApp.getFolderById(CONFIG.parentFolderId);

  const folders = parent.getFoldersByName(clientName);

  if (folders.hasNext()) {
    return folders.next();
  }

  return parent.createFolder(clientName);
}


//  Generate Invoice Document
function generateInvoice(data, total) {
  const file = DriveApp.getFileById(CONFIG.templateId);
  const copy = file.makeCopy(`Invoice_${data.client}`);

  const doc = DocumentApp.openById(copy.getId());
  const body = doc.getBody();

  // Dynamic placeholders
  const replacements = {
    "{{CLIENT_NAME}}": data.client,
    "{{TASK_NAME}}": data.task,
    "{{HOURS}}": data.hours,
    "{{RATE}}": data.rate,
    "{{TOTAL}}": total,
    "{{DATE}}": new Date().toDateString()
  };

  Object.keys(replacements).forEach(key => {
    body.replaceText(key, String(replacements[key]));
  });

  doc.saveAndClose();

  return copy.getId();
}


//  Export PDF (robust method)
function exportPdf(docId, clientName) {
  Utilities.sleep(3000); // ensure doc is ready

  const url = `https://docs.google.com/document/d/${docId}/export?format=pdf`;
  const token = ScriptApp.getOAuthToken();

  const response = UrlFetchApp.fetch(url, {
    headers: { Authorization: "Bearer " + token }
  });

  const today = new Date().toISOString().split("T")[0];
  const cleanClient = clientName.replace(/\s+/g, "_");

  return response.getBlob()
    .setName(`Invoice_${today}_${cleanClient}.pdf`)
    .setContentType("application/pdf");
}


//  Main Controller (called from HTML)
function saveData(data) {
  try {

    //  Validation
    if (!data || !data.client || !data.task || !data.hours || !data.rate) {
      throw new Error("Missing required fields");
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    //  Convert + calculate
    const conversionRate = getConversionRate(data.currency, CONFIG.targetCurrency);
    const total = Number(data.hours) * Number(data.rate) * conversionRate;

    //  Save to Sheet
    sheet.appendRow([
      new Date(),
      data.client,
      data.task,
      data.hours,
      data.rate,
      data.currency,
      total
    ]);

    //  Generate invoice
    const docId = generateInvoice(data, total);

    //  Convert to PDF
    const pdfBlob = exportPdf(docId, data.client);

    //  Save in Drive folder
    const folder = getClientFolder(data.client);
    const file = folder.createFile(pdfBlob);

    return file.getUrl();

  } catch (e) {
    Logger.log(" ERROR: " + e.message);
    throw new Error(e.message);
  }
}


// Web App Entry
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
