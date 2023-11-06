import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface ColorScheme {
  color1: string;
  color2: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  const fetchUrl = 'https://dev-quotes.onrender.com/api/random';

  let cl: ColorScheme = {
    color1: '#cccccc',
    color2: '#ffffff',
  };

  const theme = req.query.theme as string;

  if (theme === 'white') {
    cl.color1 = '#2b2b2b';
    cl.color2 = '#000000';
  }

  const quote = await fetchQuotes(fetchUrl);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(renderQuote(quote, cl));
}

const fetchQuotes = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const renderQuote = (q: { author: string; quote: string }, cl: ColorScheme) => {
  const author = q.author;
  const quote = q.quote;

  return `
    <svg width="800" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <foreignObject  width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color: ${cl.color1}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
          <h3 style="font-size: 22px;">“${quote}”</h3>
          <div style="color: ${cl.color2}; font-size: 18px; position: absolute; right: 0; bottom: 0;">
            <h3>— ${author}</h3>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
};

export default handler;
