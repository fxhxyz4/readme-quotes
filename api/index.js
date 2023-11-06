import axios from 'axios';

let cl = {
  color1: '#cccccc',
  color2: '#ffffff',
};

export default async function handler(req, res) {
  let fetchUrl = 'https://dev-quotes.onrender.com/api/random';

  const theme = req.query.theme;

  if (theme == 'white') {
    cl.color1 = '#2b2b2b';
    cl.color2 = '#000000';
  }

  const quote = await fetchQuotes(fetchUrl);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(renderQuote(req.query));
}

const fetchQuotes = async url => {
  const response = await axios.get(url);
  return response.data;
};

const renderQuote = q => {
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
