const APP_ID = 'samruddhi-menu-builder';
const SYNC_FILE_NAME = 'samruddhi-cloud-sync.json';

function doGet(e) {
  const payload = readPayload_() || emptyPayload_();
  const callback = cleanCallback_(e.parameter.callback || '');
  const json = JSON.stringify(payload);

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const incoming = JSON.parse((e.postData && e.postData.contents) || '{}');
    const payload = choosePayload_(incoming);
    writePayload_(payload);
    return ContentService.createTextOutput('ok');
  } catch (error) {
    return ContentService.createTextOutput('invalid');
  }
}

function choosePayload_(incoming) {
  const incomingState = extractState_(incoming);
  if (!incomingState) throw new Error('Invalid payload');

  const incomingPayload = incoming.state ? incoming : wrapState_(incomingState);
  const currentPayload = readPayload_();
  const currentState = extractState_(currentPayload);

  if (!currentState) return incomingPayload;

  const incomingTime = Date.parse(incomingState.updatedAt || '') || 0;
  const currentTime = Date.parse(currentState.updatedAt || '') || 0;
  return incomingTime >= currentTime ? incomingPayload : currentPayload;
}

function readPayload_() {
  const file = getSyncFile_();
  if (!file) return null;

  const text = file.getBlob().getDataAsString('UTF-8');
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function writePayload_(payload) {
  let file = getSyncFile_();
  const text = JSON.stringify(payload, null, 2);

  if (file) {
    file.setContent(text);
  } else {
    DriveApp.createFile(SYNC_FILE_NAME, text, MimeType.PLAIN_TEXT);
  }
}

function getSyncFile_() {
  const files = DriveApp.getFilesByName(SYNC_FILE_NAME);
  return files.hasNext() ? files.next() : null;
}

function extractState_(payload) {
  if (!payload || typeof payload !== 'object') return null;
  return payload.state && typeof payload.state === 'object' ? payload.state : payload;
}

function wrapState_(state) {
  return {
    app: APP_ID,
    version: 3,
    exportedAt: new Date().toISOString(),
    state: state,
  };
}

function emptyPayload_() {
  return {
    app: APP_ID,
    version: 3,
    exportedAt: new Date().toISOString(),
    state: null,
  };
}

function cleanCallback_(callback) {
  return /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback) ? callback : '';
}