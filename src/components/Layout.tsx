import clsx from 'clsx';
import Head from 'next/head';

import Header from './Header';

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Head>
        {/* //todo move this to another location */}
        <style jsx global>
          {`:root { --font-sans`}
        </style>
      </Head>
      <Header />
      <main
        className={clsx(
          'relative mt-20 flex min-h-screen flex-1 flex-col',
          // YekanBakh.className,
        )}
      >
        <div className='flex flex-1 grow flex-col bg-white'>{children}</div>
      </main>
    </>
  );
}
