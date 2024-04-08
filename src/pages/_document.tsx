import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en' dir='rtl' className='h-full'>
      <Head>
        <link
          rel='stylesheet'
          id='styles-css'
          href='https://clinicsarmayeh.com/wp-content/themes/websima/style.css?ver=1.0.10'
          media='all'
        />
        <link
          rel='stylesheet'
          id='editor-css'
          href='https://clinicsarmayeh.com/wp-content/themes/websima/assets/css/editor.css?ver=1.0.10'
          media='all'
        />
        <link
          rel='stylesheet'
          id='used-on-header-css'
          href='https://clinicsarmayeh.com/wp-content/themes/websima/assets/css/used-on-header.css?ver=1.0.10'
          media='all'
        />
        <link
          rel='stylesheet'
          id='websima-mega-menu-css'
          href='https://clinicsarmayeh.com/wp-content/themes/websima/includes/websima-mega-menu/assets/css/style.css?ver=1.0.10'
          media='all'
        />
        <link
          rel='stylesheet'
          id='used-on-post-css'
          href='https://clinicsarmayeh.com/wp-content/themes/websima/assets/css/used-on-post.css?ver=1.0.10'
          media='all'
        />
        <Script
          type='d0dfe75f40e6ba04541646e0-text/javascript'
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-RMVQS8DCQ3&amp;l=dataLayer&amp;cx=c'
        ></Script>
        <Script
          data-cfasync='false'
          src='/assets/js/jquery.min.js'
          type='text/javascript'
          strategy='beforeInteractive'
        ></Script>
        <Script
          data-cfasync='false'
          src='/assets/js/jquery-migrate.min.js'
          type='text/javascript'
          strategy='beforeInteractive'
        ></Script>
        {/* <Script
          data-cfasync='false'
          src='/assets/js/misc.js'
          type='text/javascript'
          strategy='beforeInteractive'
          defer
        ></Script>
        <Script
          data-cfasync='false'
          src='/assets/js/custom.js'
          type='text/javascript'
          strategy='beforeInteractive'
          defer
        ></Script> */}
      </Head>
      <body className='relative h-full font-sans antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
