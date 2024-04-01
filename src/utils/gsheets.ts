import { google } from 'googleapis';

export async function getGoogleSheetsData(range: string) {
  let sheetData;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ auth, version: 'v4' });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });
    sheetData = response?.data?.values;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
  return sheetData;
}

export function generateHtmlContentFromSheetData(
  sheetData: string[][]
): string {
  let listItems: string[] = [];
  let htmlContent: string = '';

  sheetData.forEach((row: string[]) => {
    const data: string = row[0];
    const tag: string = row[1];
    const classes: string = row[2];

    if (tag === 'ul' || tag === 'ol' || tag == 'div') {
      if (listItems.length > 0) {
        htmlContent += `<${tag} ${
          classes ? 'class=' + "'" + classes + "'" : ''
        }>${listItems.join('')}</${tag}>`;
        listItems = [];
      }
    } else {
      listItems.push(
        `<${tag} ${
          classes ? 'class=' + "'" + classes + "'" : ''
        }>${data}</${tag}>`
      );
    }
  });

  if (listItems.length > 0) {
    htmlContent += `<ul>${listItems.join('')}</ul>`;
  }

  return htmlContent;
}
