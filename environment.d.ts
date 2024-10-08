declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string; // this is the line you want
    NEXT_PUBLIC_API_URL: string; // this is the line you want
    NEXT_PUBLIC_STRIPE_API_KEY: string;
    NODE_ENV: 'development' | 'production';
  }
}
