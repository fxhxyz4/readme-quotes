export const renderError = (error: unknown): string => {
  const message =
    error instanceof Error
      ? error.message
      : 'Failed to fetch quote';

  return `
    <svg
      width="800"
      height="200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="800"
        height="200"
        fill="#ff4444"
        rx="8"
      />

      <foreignObject width="100%" height="100%">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            height: 100%;
            font-family: monospace;
          "
        >
          <p
            style="
              font-size: 18px;
              color: #ffffff;
              margin: 0;
              text-align: center;
            "
          >
            Error: ${message}
          </p>
        </div>
      </foreignObject>
    </svg>
  `;
};