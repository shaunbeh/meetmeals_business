import clsx from 'clsx';
import Head from 'next/head';

import Header from './Header';

export default function Layout({
  children,
  title,
}: {
  children: JSX.Element;
  title?: string;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <div
        className={clsx(
          'relative mt-20 flex min-h-[calc(100vh-200px)] flex-1 flex-col px-1 md:px-4',
        )}
      >
        <div className='flex flex-1 grow flex-col bg-white'>{children}</div>
      </div>
    </>
  );
}
