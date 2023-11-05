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
    <svg width="300" height="300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <foreignObject  width="100%" height="100%">
        <h3>&#8220;${quote}&#8221;</h3>
        <br />
        <br />
        <div align="right">
          <h3>&#8210; ${author}</h3>
        </div>
      </foreignObject>
    </svg>
  `;
};
