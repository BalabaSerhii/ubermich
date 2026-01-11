// [project_root]/actions/quiz.ts

"use server"; // <--- !!! ЭТО ОБЯЗАТЕЛЬНО !!!

import { google } from "googleapis";

// 1. Настройка аутентификации (использует .env.local)
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

interface QuizSubmission {
  answers: Record<string, string>;
  phone: string;
  email?: string;
}

// 2. ЭКСПОРТ ФУНКЦИИ (Обязательно с export)
export async function submitQuizAction(data: QuizSubmission) {
  // <--- !!! ЗДЕСЬ export !!!
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const range = "Sheet1!A:Z";

  if (!data.phone) {
    return { success: false, message: "Номер телефона обязателен." };
  }

  const timestamp = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });
  const allValues = [
    timestamp,
    data.phone,
    data.email || "Не указан",
    ...Object.values(data.answers),
  ];

  try {
    // ЗАПИСЬ В GOOGLE SHEETS
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [allValues],
      },
    });

    // ОТПРАВКА ОПОВЕЩЕНИЯ (Webhook)
    if (process.env.ALERT_WEBHOOK_URL) {
      // ... (логика fetch для оповещения)
    }

    return {
      success: true,
      message: "Спасибо! Ваши ответы получены, мы скоро свяжемся.",
    };
  } catch (error) {
    console.error("SERVER ACTION ERROR:", error);
    return { success: false, message: "Произошла ошибка при отправке данных." };
  }
}
