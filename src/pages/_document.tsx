import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang='en'
      // dir='rtl'
      className='h-full'
    >
      <Head />
      <body className='relative font-sans antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
