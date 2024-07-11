import { cn } from '@/lib/utils';

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        ' flex flex-col w-full mx-auto justify-center px-4 md:px-8 py-10 gap-6 max-w-screen-2xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
