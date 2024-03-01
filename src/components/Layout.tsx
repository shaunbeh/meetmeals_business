import clsx from 'clsx';
import CustomFont from 'next/font/local';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import Head from 'next/head';

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
const fetchHeader = async () => {
  const res = await fetch('/clinic/custom-section/v1/header/');
  return res.text();
};

const fetchFooter = async () => {
  const res = await fetch('/clinic/custom-section/v1/footer/');
  return res.text();
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [headerHtml, setHeaderHtml] = useState('');
  const [footerHtml, setFooterHtml] = useState('');

  useEffect(() => {
    fetchHeader().then(setHeaderHtml);
    fetchFooter().then(setFooterHtml);
  }, []);

  return (
    <>
      <Head>
        <style
          jsx
          global
        >{`:root { --font-sans: ${YekanBakh.style.fontFamily};}}`}</style>
      </Head>
      <main
        className={clsx(
          'relative flex flex-col min-h-screen',
          YekanBakh.className
        )}
      >
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
