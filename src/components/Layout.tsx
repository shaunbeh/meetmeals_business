import clsx from 'clsx';
import CustomFont from 'next/font/local';
import DOMPurify from 'dompurify';
import { Fragment, useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import Head from 'next/head';
import Script from 'next/script';

const YekanBakh = CustomFont({
  src: [
    {
      path: '../../public/fonts/YekanBakh-Bold.woff',
      weight: '700',
    },
    { path: '../../public/fonts/YekanBakh-Regular.woff', weight: '400' },
    { path: '../../public/fonts/YekanBakh-Medium.woff', weight: '500' },
    { path: '../../public/fonts/YekanBakh-Light.woff', weight: '300' },
  ],
});
const fetchContent = async (url) => {
  try {
    const res = await fetch(url);
    return res.text();
  } catch (error) {
    console.error('Error fetching content:', error);
    return ''; // Return an empty string in case of an error
  }
};

export default function Layout({ children }) {
  const [headerHtml, setHeaderHtml] = useState('');
  const [headHtml, setHeadHtml] = useState('');
  const [footerHtml, setFooterHtml] = useState('');

  useEffect(() => {
    const fetchContentData = async () => {
      const [headContent, headerContent, footerContent] = await Promise.all([
        fetchContent('/clinic/custom-section/v1/head/'),
        fetchContent('/clinic/custom-section/v1/header/'),
        fetchContent('/clinic/custom-section/v1/footer/'),
      ]);

      setHeadHtml(headContent);
      setHeaderHtml(headerContent);
      setFooterHtml(footerContent);
    };

    fetchContentData();
  }, []);

  return (
    <>
      <Head>
        <style
          jsx
          global
        >{`:root { --font-sans: ${YekanBakh.style.fontFamily};}}`}</style>
      </Head>
      <Script src='https://code.jquery.com/jquery-3.6.0.js'></Script>
      <main
        className={clsx(
          'relative flex flex-col min-h-screen',
          YekanBakh.className
        )}
      >
        {headHtml && (
          <div
            dangerouslySetInnerHTML={{
              __html: headHtml,
            }}
          />
        )}
        {headerHtml ? (
          // {false ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(headerHtml),
            }}
          />
        ) : (
          <Skeleton className='w-full h-20 xl:h-[105px]'></Skeleton>
        )}
        <div className='flex flex-grow flex-col flex-1 bg-white'>
          {' '}
          {children}
        </div>
        {footerHtml ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(footerHtml),
            }}
          />
        ) : (
          <Skeleton className='w-full mt-16 h-[700px]'></Skeleton>
        )}
      </main>
    </>
  );
}
