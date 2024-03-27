import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

type SheetForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET method is allowed.' });
  }

  // } catch (err) {
  //   document.getElementById('content').innerText = err.message;
  //   return;
  // }
  // const range = response.result;
  // if (!range || !range.values || range.values.length == 0) {
  //   document.getElementById('content').innerText = 'No values found.';
  //   return;
  // }
  // Flatten to string to display
  // const output = range.values.reduce(
  //     (str, row) => `${str}${row[0]}, ${row[4]}\n`,
  //     'Name, Major:\n');
  // document.getElementById('content').innerText = output;

  try {
    // prepare auth
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
      range: 'A:B',
    });
    return res.status(200).json({ data: response.data });
  } catch (e) {
    let errorMessage = 'Something went wrong';
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
}
