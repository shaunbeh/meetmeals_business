import { ReloadIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

function LoadingOverlay({ className }: { className?: string }) {
  return (
    <div className={cn('fixed inset-0 z-50 size-full', className)}>
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-start gap-2.5 text-primary'>
        <span>Loading...</span>
        <ReloadIcon className='animate-spin' />
      </div>
    </div>
  );
}

export default LoadingOverlay;
