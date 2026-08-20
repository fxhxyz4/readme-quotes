import { VercelRequest, VercelResponse } from '@vercel/node';

import { fetchQuote } from '../src/services/quote.service';
import { renderError } from '../src/renderers/error.renderer';
import { renderQuote } from '../src/renderers/quote.renderer';
import { getTheme } from '../src/utils/theme';

const handler = async (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> => {
  try {
    const themeName =
      typeof req.query.theme === 'string'
        ? req.query.theme
        : undefined;

    const author =
      typeof req.query.author === 'string'
        ? req.query.author
        : undefined;

    const id =
      typeof req.query.id === 'string'
        ? req.query.id
        : undefined;

    const quote = await fetchQuote({
      id,
      author,
    });

    const theme = getTheme(themeName);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader(
      'Cache-Control',
      'public, max-age=0, must-revalidate',
    );

    res.status(200).send(renderQuote(quote, theme));
  } catch (error: unknown) {
    res.status(500).send(renderError(error));
  }
};

export default handler;