import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' className='h-full'>
      <Head />
      <body className='relative h-full font-sans antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
