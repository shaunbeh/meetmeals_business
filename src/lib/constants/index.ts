export const appConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  analyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
};

export const CURRENCY = 'usd';
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0;
export const MAX_AMOUNT = 5000.0;
export const AMOUNT_STEP = 5.0;

export const stripeAppearance = {
  theme: 'flat' as const,
  variables: {
    colorPrimary: '#ff0000',
    colorText: '#333',
  },
  rules: {
    '.Input': {
      color: '#333',
    },
    '.RedirectText': {
      padding: '1rem',
    },
  },
};
