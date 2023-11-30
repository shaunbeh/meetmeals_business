import clsx from 'clsx';
import CustomFont from 'next/font/local';

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={clsx(
        'relative flex flex-col min-h-screen',
        YekanBakh.className
      )}
    >
      <div className='flex-grow flex-1'>{children}</div>
    </main>
  );
}
