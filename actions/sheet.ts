// actions/sheet.ts

"use server";

import { google } from "googleapis";

// 1. Создаем объект авторизации, используя переменные окружения
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Заменяем '\n' на реальные переносы строки
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Область доступа
});

const sheets = google.sheets({ version: "v4", auth });

interface TestSubmission {
  name: string;
  email: string;
  phone: string;
}

export async function addTestLead(data: TestSubmission) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const range = "Sheet1!A:D"; // Название листа и столбцы

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toISOString(), // Timestamp
            data.name,
            data.email,
            data.phone,
          ],
        ],
      },
    });

    console.log(
      `Successfully added lead. Rows updated: ${response.data.updates.updatedCells}`
    );
    return { success: true, message: "Данные успешно отправлены в таблицу!" };
  } catch (error) {
    console.error("GOOGLE SHEETS API ERROR:", error.message);
    return { success: false, message: "Ошибка при отправке данных на сервер." };
  }
}
