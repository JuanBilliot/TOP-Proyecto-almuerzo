// CONFIGURACIÓN BÁSICA
const APP_BASE_URL = 'https://top-proyecto-almuerzo-27dq630nj-juanbilliot-6686s-projects.vercel.app';
const SHEET_NAME = 'Hoja 1'; // cambia si tu pestaña se llama distinto

function generateToken_() {
  return Utilities.getUuid();
}

// Genera tokens para todos los usuarios que no tengan uno en la columna "token"
function generarTokensSiFaltan() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const data = sheet.getRange(2, 1, lastRow, 3).getValues();
  const updates = [];

  data.forEach((row, index) => {
    const email = row[0];
    const nombre = row[1];
    let token = row[2];

    if (!email) return;

    if (!token) {
      token = generateToken_();
      row[2] = token;
      updates.push({ rowIndex: index, rowValues: row });
    }
  });

  if (updates.length > 0) {
    updates.forEach(u => {
      sheet.getRange(2 + u.rowIndex, 1, 2 + u.rowIndex, 3).setValues([u.rowValues]);
    });
  }
}

// ENVÍA UN MAIL A CADA USUARIO CON SU LINK PERSONALIZADO (incluye turno)
function enviarLinksMenuSemanal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  generarTokensSiFaltan();

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  // Leer 4 columnas: A=email, B=nombre, C=token, D=turno
  const data = sheet.getRange(2, 1, lastRow, 4).getValues();

  const TEST_EMAILS = [
    'giselle.morbello@sommiercenter.com',
  ];

  data.forEach((row) => {
    const email = row[0];
    const nombre = row[1] || 'Colaborador';
    const token = row[2];
    const turno = (row[3] === 2 || row[3] === '2') ? 2 : 1;

    if (!email || !token) return;

    if (TEST_EMAILS.indexOf(email) === -1) {
      return;
    }

    const url = APP_BASE_URL
      + '?u=' + encodeURIComponent(token)
      + '&email=' + encodeURIComponent(email)
      + '&name=' + encodeURIComponent(nombre)
      + '&turno=' + turno;

    const subject = 'Menú semanal disponible';
    const body = [
      'Buen día ' + nombre + ',',
      '',
      'Ya está disponible el menú semanal para que elijas tus opciones.',
      'Por favor ingresá al siguiente enlace para seleccionar tu menú:',
      '',
      url,
      '',
      'Recordá que podés modificar tu elección hasta la fecha/hora límite establecida.',
      '',
      'Saludos,',
      'RRHH / Organización de Almuerzos'
    ].join('\n');

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });
  });
}

// Para que la URL no dé error al abrirla en el navegador (GET)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Backend menú semanal activo' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// === WEB APP: recibe la selección final desde la app ===
function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      throw new Error('Sin cuerpo en la petición');
    }

    var data = JSON.parse(e.postData.contents);

    var userName   = data.userName   || 'Colaborador';
    var userEmail  = data.userEmail  || '';
    var userToken  = data.userToken  || '';
    var weekNumber = data.weekNumber || '';
    var userTurn   = data.userTurn   || '';
    var selections = data.selections || {};
    var weeklyMenu = data.weeklyMenu || [];

    var summaryLines = weeklyMenu.map(function(day, index) {
      var sel = selections[index];
      if (!sel) {
        return day.day + ': SIN SELECCIÓN';
      }
      return day.day + ': ' + sel.name + ' - ' + sel.dish + ' (' + sel.category + ')';
    });

    var summaryText = summaryLines.join('\n');

    // Mail de confirmación al usuario
    if (userEmail) {
      var subjectUser = 'Confirmación de tu menú semanal';
      var bodyUser = [
        'Hola ' + userName + ',',
        '',
        'Tu selección de menú semanal ha sido registrada correctamente.',
        '',
        'Semana: ' + weekNumber,
        'Turno: ' + userTurn,
        '',
        'Detalle de tu selección:',
        '',
        summaryText,
        '',
        'Si detectás algún error, por favor contactá a RRHH / organización de almuerzos.',
        '',
        'Saludos,',
        'RRHH / Organización de Almuerzos'
      ].join('\n');

      MailApp.sendEmail({
        to: userEmail,
        subject: subjectUser,
        body: bodyUser
      });
    }

    // Mail al organizador
    var adminEmail = 'juan.billiot@sommiercenter.com';
    var subjectAdmin = 'Nueva selección de menú - ' + userName;
    var bodyAdmin = [
      'Usuario: ' + userName,
      'Email: ' + (userEmail || '(no informado)'),
      'Token: ' + (userToken || '(sin token)'),
      'Semana: ' + weekNumber,
      'Turno: ' + userTurn,
      '',
      'Selección:',
      '',
      summaryText
    ].join('\n');

    MailApp.sendEmail({
      to: adminEmail,
      subject: subjectAdmin,
      body: bodyAdmin
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('Error en doPost: ' + err);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
      .setResponseCode(500);
  }
}
