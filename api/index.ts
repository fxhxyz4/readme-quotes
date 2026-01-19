import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface Quote {
  author: string;
  quote: string;
}

interface Theme {
  name: string;
  bg: string;
  text: string;
  author: string;
}

const themes: Theme[] = [
  { name: 'telegram', bg: '#0088cc', text: '#1c1c1c', author: '#000000' },
  { name: 'github', bg: '#0d1117', text: '#c9d1d9', author: '#58a6ff' },
  { name: 'dracula', bg: '#282a36', text: '#f8f8f2', author: '#ff79c6' },
  { name: 'monokai', bg: '#272822', text: '#f8f8f2', author: '#a6e22e' },
  { name: 'nord', bg: '#2e3440', text: '#d8dee9', author: '#88c0d0' },
  { name: 'ocean', bg: '#1a1f3a', text: '#e0e7ff', author: '#60a5fa' },
  { name: 'sunset', bg: '#1a0b2e', text: '#f4e4ba', author: '#ff6f61' },
  { name: 'forest', bg: '#1b2e1f', text: '#e8f5e9', author: '#66bb6a' },
  { name: 'rose', bg: '#2d1b2e', text: '#fce4ec', author: '#f48fb1' },
  { name: 'cyberpunk', bg: '#0a0e27', text: '#00ff9f', author: '#ff2e97' },
];

async function handler(req: VercelRequest, res: VercelResponse) {
  const fetchUrl = 'https://dev-quotes.onrender.com/api/random';
  const quote = await fetchQuotes(fetchUrl);

  const themeName = (req.query.theme as string) || 'telegram';
  const theme = themes.find(t => t.name === themeName) || themes[0];

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.send(renderQuote(quote, theme));
}

const fetchQuotes = async (url: string): Promise<Quote> => {
  const response = await axios.get(url);
  return response.data;
};

const calculateHeight = (quote: string, author: string): number => {
  const quoteLength = quote.length;
  const authorLength = author.length;

  let height = 140;

  if (quoteLength > 100) height += 40;
  if (quoteLength > 150) height += 40;

  if (quoteLength > 200) height += 40;
  if (quoteLength > 250) height += 40;

  if (authorLength > 20) height += 20;
  return Math.max(height, 180);
};

const renderQuote = (q: Quote, theme: Theme): string => {
  const author = q.author;
  const quote = q.quote;

  const height = calculateHeight(quote, author);

  return `
    <svg width="800" height="${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="${height}" fill="${theme.bg}" rx="8"/>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 30px 40px;
          box-sizing: border-box;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        ">
          <div style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding-bottom: 20px;
          ">
            <p style="
              font-size: 20px;
              color: ${theme.text};
              margin: 0;
              line-height: 1.6;
              font-weight: 400;
              max-width: 90%;
              word-wrap: break-word;
            ">"${quote}"</p>
          </div>
          <div style="
            text-align: right;
            margin-top: auto;
          ">
            <p style="
              font-size: 16px;
              color: ${theme.author};
              margin: 0;
              font-weight: 500;
              font-style: italic;
            ">— ${author}</p>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
};

export default handler;
