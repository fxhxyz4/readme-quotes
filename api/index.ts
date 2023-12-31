import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface Quote {
  author: string;
  quote: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  const fetchUrl = 'https://dev-quotes.onrender.com/api/random';

  const quote = await fetchQuotes(fetchUrl);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(renderQuote(quote));
}

const fetchQuotes = async (url: string): Promise<Quote> => {
  const response = await axios.get(url);
  return response.data;
};

const renderQuote = (q: Quote): string => {
  const author = q.author;
  const quote = q.quote;

  return `
    <svg width="800" height="205" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        @media (prefers-color-scheme: dark) {
          .div {
            color: #cccccc;
          }
          .child-div {
            color: #ffffff;
          }
        }

        @media (prefers-color-scheme: light) {
          .div {
            color: #2b2b2b;
          }
          .child-div {
            color: #000000;
          }
        }
      </style>
      <foreignObject  width="100%" height="100%">
        <div class="div" xmlns="http://www.w3.org/1999/xhtml" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
          <h3 style="font-size: 22px;">“${quote}”</h3>
          <div class="child-div" style="font-size: 18px; position: absolute; right: 0; bottom: 0;">
            <h3>— ${author}</h3>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
};

export default handler;
