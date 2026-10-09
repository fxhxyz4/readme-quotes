import axios from 'axios';

import { API_CONFIG } from '../config/api';
import { Quote } from '../models/quote';
import { HttpError } from '../utils/errors';

interface QuoteParams {
  id?: string;
  author?: string;
}

const buildUrl = ({ id, author }: QuoteParams): string => {
  if (id) {
    return `${API_CONFIG.baseUrl}/id?id=${encodeURIComponent(id)}`;
  }

  if (author) {
    return `${API_CONFIG.baseUrl}/author?author=${encodeURIComponent(author)}`;
  }

  return `${API_CONFIG.baseUrl}/random`;
};

const isQuote = (value: unknown): value is Quote => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const { quote, author } = value as Record<string, unknown>;

  return (
    typeof quote === 'string' &&
    quote.trim() !== '' &&
    typeof author === 'string' &&
    author.trim() !== ''
  );
};

const pickRandom = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

const toHttpError = (error: unknown): HttpError => {
  if (error instanceof HttpError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return new HttpError('Quotes API timed out', 504);
    }

    if (error.response?.status === 404) {
      return new HttpError('Quote not found', 404);
    }
  }

  return new HttpError('Quotes API is unavailable', 502);
};

export const fetchQuote = async (params: QuoteParams): Promise<Quote> => {
  try {
    const response = await axios.get<unknown>(buildUrl(params), {
      timeout: API_CONFIG.timeoutMs,
      maxContentLength: API_CONFIG.maxContentLength,
    });

    const data = response.data;

    if (Array.isArray(data)) {
      const quotes = data.filter(isQuote);

      if (quotes.length === 0) {
        throw new HttpError('Quote not found', 404);
      }

      return pickRandom(quotes);
    }

    if (!isQuote(data)) {
      throw new HttpError('Invalid response from quotes API', 502);
    }

    return data;
  } catch (error: unknown) {
    throw toHttpError(error);
  }
};
