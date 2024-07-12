declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_STRIPE_API_KEY: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
    NODE_ENV: 'development' | 'production';
  }
}
