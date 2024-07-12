/* eslint-disable react/no-danger */
import { Head, Html, Main, NextScript } from 'next/document';

import { appConfig } from '@/lib/constants';

export default function Document() {
  return (
    <Html
      lang='fa'
      // dir='rtl'
      className='h-full'
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${appConfig.analyticsId}');
            `,
          }}
        />
      </Head>
      <body className='relative font-sans antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
