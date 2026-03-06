import nodemailer from 'nodemailer';

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;
const fromName = process.env.FROM_NAME || 'Sistema de Menús';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    if (!gmailUser || !gmailPass) {
      throw new Error('Faltan GMAIL_USER o GMAIL_PASS en las variables de entorno');
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
  }
  return transporter;
}

export async function sendUserSummaryEmail({ to, userName, weekNumber, userTurn, summaryText }) {
  const transport = getTransporter();

  const subject = `Resumen de tu menú semanal - ${weekNumber}`;
  const text = [
    `Hola ${userName},`,
    '',
    'Este es el resumen de tus menús para la semana:',
    '',
    summaryText,
    '',
    `Turno: ${userTurn}`,
    '',
    'Si necesitas hacer algún cambio, por favor contacta al organizador.',
  ].join('\n');

  await transport.sendMail({
    from: `"${fromName}" <${gmailUser}>`,
    to,
    subject,
    text,
  });
}

export async function sendAdminNotificationEmail({
  to,
  userName,
  userEmail,
  userToken,
  weekNumber,
  userTurn,
  summaryText,
}) {
  const transport = getTransporter();

  const subject = `Nueva selección de menú - ${userName}`;
  const lines = [
    `Usuario: ${userName}`,
    userEmail ? `Email: ${userEmail}` : 'Email: (no proporcionado)',
    userToken ? `Token: ${userToken}` : 'Token: (no proporcionado)',
    `Semana: ${weekNumber}`,
    `Turno: ${userTurn}`,
    '',
    'Selección:',
    '',
    summaryText,
  ];

  await transport.sendMail({
    from: `"${fromName}" <${gmailUser}>`,
    to,
    subject,
    text: lines.join('\n'),
  });
}

