import clsx from 'clsx';
import CustomFont from 'next/font/local';
import Head from 'next/head';

import Header from './Header';

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

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Head>
        {/* //todo move this to another location */}
        <style jsx global>
          {`:root { --font-sans: ${YekanBakh.style.fontFamily};}}`}
        </style>
      </Head>
      <Header />
      <main
        className={clsx(
          'relative mt-20 flex min-h-screen flex-1 flex-col',
          YekanBakh.className,
        )}
      >
        <div className='flex flex-1 grow flex-col bg-white'>{children}</div>
      </main>
    </>
  );
}
