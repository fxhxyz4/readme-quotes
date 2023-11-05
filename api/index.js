import axios from 'axios';

export default async function handler(req, res) {
  const fetchUrl = 'https://dev-quotes.onrender.com/api/random';

  const quote = await fetchQuotes(fetchUrl);

  const widgetHTML = renderQuote(quote);

  res.setHeader('Content-Type', 'text/html');
  res.status(200).end(widgetHTML);
}

const fetchQuotes = async (url) => {
  const response = await axios.get(url);
  return response.data;
}

const renderQuote = (q) => {
  const author = q.author;
  const quote = q.quote;

  return `
    <h3>“${quote}”</h3>
    <br />
    <br />
    <div align="right">
      <h3>— ${author}</h3>
    </div>
  `;
}
