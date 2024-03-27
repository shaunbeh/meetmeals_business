import { google } from 'googleapis';

export async function getGoogleSheetsData(range: string) {
  const auth = await google.auth.getClient({
    projectId: '',
    credentials: {
      type: '',
      private_key: '',
      client_email: '',
      client_id: '',
      token_url: '',
      universe_domain: '',
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const data = await sheets.spreadsheets.values.get({
    spreadsheetId: '',
    range,
  });

  return data.data.values;
}
export function generateHtmlContentFromSheetData(
  sheetData: string[][]
): string {
  let listItems: string[] = [];
  let htmlContent: string = '';

  sheetData.forEach((row: string[]) => {
    const tag: string = row[0].trim().toLowerCase();
    const data: string = row[1];

    if (tag === 'ul') {
      if (listItems.length > 0) {
        htmlContent += `<ul>${listItems.join('')}</ul>`;
        listItems = [];
      }
    } else if (tag === 'li') {
      listItems.push(`<li>${data}</li>`);
    }
  });

  if (listItems.length > 0) {
    htmlContent += `<ul>${listItems.join('')}</ul>`;
  }

  return htmlContent;
}
