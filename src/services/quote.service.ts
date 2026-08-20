import axios from 'axios';

import { API_CONFIG } from '../config/api';
import { Quote } from '../models/quote';

const buildUrl = (params: {
  id?: string;
  author?: string;
}): string => {
  const { id, author } = params;

  if (id) {
    return `${API_CONFIG.baseUrl}/id?id=${encodeURIComponent(id)}`;
  }

  if (author) {
    return `${API_CONFIG.baseUrl}/author?author=${encodeURIComponent(author)}`;
  }

  return `${API_CONFIG.baseUrl}/random`;
};

const getRandomQuote = (quotes: Quote[]): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const fetchQuote = async (params: {
  id?: string;
  author?: string;
}): Promise<Quote> => {
  const url = buildUrl(params);
  const response = await axios.get<Quote | Quote[]>(url);

  const data = response.data;

  if (Array.isArray(data)) {
    if (data.length === 0) {
      throw new Error('No quotes found');
    }

    return getRandomQuote(data);
  }

  return data;
};