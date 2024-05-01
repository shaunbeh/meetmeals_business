import { ServerSideProps } from '@/types/commonTypes';
import clsx from 'clsx';
import CustomFont from 'next/font/local';
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

export default function Layout({
  children,
}: { children: JSX.Element }) {

  return (
    <>
      <Head>
        {/* //todo move this to another location */}
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
        <div className='flex flex-grow flex-col flex-1 bg-white'>
          {children}
        </div>
      </main>
    </>
  );
}
