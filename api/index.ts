import { renderError } from '../src/renderers/error.renderer';
import { renderQuote } from '../src/renderers/quote.renderer';
import { ApiRequest, ApiResponse } from '../src/models/http';
import { fetchQuote } from '../src/services/quote.service';
import { getTheme } from '../src/utils/theme';

const SUCCESS_CACHE =
  'public, max-age=0, s-maxage=300, stale-while-revalidate=86400';
const ERROR_CACHE = 'public, max-age=0, s-maxage=30';

const readParam = (
  value: string | string[] | undefined
): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed === '' ? undefined : trimmed;
};

const handler = async (req: ApiRequest, res: ApiResponse): Promise<void> => {
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');

  try {
    const quote = await fetchQuote({
      id: readParam(req.query.id),
      author: readParam(req.query.author),
    });

    const theme = getTheme(readParam(req.query.theme));

    res.setHeader('Cache-Control', SUCCESS_CACHE);
    res.status(200).send(renderQuote(quote, theme));
  } catch (error: unknown) {
    res.setHeader('Cache-Control', ERROR_CACHE);
    res.status(200).send(renderError(error));
  }
};

export default handler;
