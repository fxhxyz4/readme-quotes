export const calculateQuoteHeight = (
  quote: string,
  author: string,
): number => {
  let height = 140;

  if (quote.length > 100) height += 40;
  if (quote.length > 150) height += 40;
  if (quote.length > 200) height += 40;
  if (quote.length > 250) height += 40;

  if (author.length > 20) {
    height += 20;
  }

  return Math.max(height, 180);
};