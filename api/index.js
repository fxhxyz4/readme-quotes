import axios from 'axios';

const INTERVAL = 10000;

const fetchQuote = async () => {
  const response = await axios.get(
    'https://dev-quotes.onrender.com/api/random'
  );
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
          <div style="color: #ffffff; font-size: 18px; position: absolute; right: 0; bottom: 0;">
            <h3>— ${author}</h3>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
};

export default async function handler(req, res) {
  const quote = await fetchQuote();

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(renderQuote(quote));
}

setInterval(async () => {
  const updatedQuote = await fetchQuote();
  renderQuote(updatedQuote);
}, INTERVAL);
