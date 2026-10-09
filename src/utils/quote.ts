export const MAX_QUOTE_LENGTH = 500;

const CHARS_PER_LINE = 58;
const LINE_HEIGHT = 32;
const BASE_HEIGHT = 124;
const MIN_HEIGHT = 180;

export const truncateQuote = (quote: string): string => {
  if (quote.length <= MAX_QUOTE_LENGTH) {
    return quote;
  }

  return `${quote.slice(0, MAX_QUOTE_LENGTH).trimEnd()}…`;
};

export const calculateQuoteHeight = (quote: string, author: string): number => {
  const lines = Math.max(1, Math.ceil(quote.length / CHARS_PER_LINE));
  const authorLines = Math.max(1, Math.ceil(author.length / 70));

  return Math.max(
    MIN_HEIGHT,
    BASE_HEIGHT + lines * LINE_HEIGHT + (authorLines - 1) * 24
  );
};
