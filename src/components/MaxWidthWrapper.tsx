import { cn } from '@/utils/utils';

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-screen-2xl', className)}>
      {children}
    </div>
  );
}
