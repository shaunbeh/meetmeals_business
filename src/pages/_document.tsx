import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang='en'
      // dir='rtl'
      className='h-full'
    >
      <Head></Head>
      <body className='relative h-full font-sans antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
