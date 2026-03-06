import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendUserSummaryEmail, sendAdminNotificationEmail } from './emailService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/selection', async (req, res) => {
  try {
    const {
      userToken,
      userName,
      userEmail,
      weekNumber,
      userTurn,
      selections,
      weeklyMenu,
    } = req.body || {};

    if (!userName || !weekNumber || !userTurn || !selections || !weeklyMenu) {
      return res.status(400).json({ error: 'Datos incompletos de selección' });
    }

    const adminEmail = process.env.ADMIN_EMAIL;

    const summaryLines = weeklyMenu.map((day, index) => {
      const sel = selections[index];
      if (!sel) {
        return `${day.day}: SIN SELECCIÓN`;
      }
      return `${day.day}: ${sel.name} - ${sel.dish} (${sel.category})`;
    });

    const summaryText = summaryLines.join('\n');

    if (userEmail) {
      await sendUserSummaryEmail({
        to: userEmail,
        userName,
        weekNumber,
        userTurn,
        summaryText,
      });
    }

    if (adminEmail) {
      await sendAdminNotificationEmail({
        to: adminEmail,
        userName,
        userEmail,
        userToken,
        weekNumber,
        userTurn,
        summaryText,
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Error en /api/selection', err);
    res.status(500).json({ error: 'Error interno al procesar la selección' });
  }
});

app.listen(port, () => {
  console.log(`Menu backend listening on port ${port}`);
});

