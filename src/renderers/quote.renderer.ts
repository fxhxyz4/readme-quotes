import { Quote } from '../models/quote';
import { Theme } from '../models/theme';
import { calculateQuoteHeight } from '../utils/quote';

export const renderQuote = (
  quoteData: Quote,
  theme: Theme,
): string => {
  const { author, quote } = quoteData;
  const height = calculateQuoteHeight(quote, author);

  return `
    <svg
      width="800"
      height="${height}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="800"
        height="${height}"
        fill="${theme.bg}"
        rx="8"
      />

      <foreignObject width="100%" height="100%">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 30px 40px;
            box-sizing: border-box;
            height: 100%;
            font-family:
              -apple-system,
              BlinkMacSystemFont,
              'Segoe UI',
              Roboto,
              Oxygen,
              Ubuntu,
              Cantarell,
              sans-serif;
          "
        >
          <div
            style="
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding-bottom: 20px;
            "
          >
            <p
              style="
                font-size: 20px;
                color: ${theme.text};
                margin: 0;
                line-height: 1.6;
                font-weight: 400;
                max-width: 90%;
                word-wrap: break-word;
              "
            >
              "${quote}"
            </p>
          </div>

          <div
            style="
              text-align: right;
              margin-top: auto;
            "
          >
            <p
              style="
                font-size: 16px;
                color: ${theme.author};
                margin: 0;
                font-weight: 500;
                font-style: italic;
              "
            >
              — ${author}
            </p>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
};