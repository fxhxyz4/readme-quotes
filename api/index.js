import axios from 'axios';

export default async function handler(req, res) {
  const fetchUrl = 'https://dev-quotes.onrender.com/api/random';

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
    <svg width="300" height="300" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <foreignObject  width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
          <h3 style="font-size: 18px;">“${quote}”</h3>
          <br />
          <br />
          <div align="right" style="font-size: 16px;">
            <h3>— ${author}</h3>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
};
