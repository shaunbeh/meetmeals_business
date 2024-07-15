/* eslint-disable react/no-danger */
import { Head, Html, Main, NextScript } from 'next/document';

import { appConfig } from '@/lib/constants';

export default function Document() {
  return (
    <Html lang='en' className='h-full'>
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
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <body className='relative font-sans antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
