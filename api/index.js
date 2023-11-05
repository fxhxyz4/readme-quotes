import axios from 'axios';

export default async function handler(req, res) {
  let fetchUrl = 'https://dev-quotes.onrender.com/api/id?id=445';

  const api2 = req.query.api2;

  switch (api2) {
    case 'id':
      const quoteId = req.query.id || '337';
      fetchUrl = `https://dev-quotes.onrender.com/api/id?id=${quoteId}`;
      break;

    case 'author':
      if (!req.query.author) {
        return res.status(400).json({ error: 'Missing author parameter' });
      }
      fetchUrl = `https://dev-quotes.onrender.com/api/author?author=${encodeURIComponent(
        req.query.author
      )}`;
      break;

    default:
      fetchUrl = 'https://dev-quotes.onrender.com/api/random';
      break;
  }

  const quote = await fetchQuotes(fetchUrl);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(renderQuote(quote));
}

const fetchQuotes = async url => {
  const response = await axios.get(url);
  return response.data;
};

const renderQuote = q => {
  const author = q.author;
  const quote = q.quote;

  return `
    <svg width="800" height="200" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <foreignObject  width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color: #cccccc; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
          <h3 style="font-size: 22px;">“${quote}”</h3>
          <div style="color: #ffffff; font-size: 18px; position: absolute;  right: 0; bottom: 0;">
            <h3>— ${author}</h3>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
};
