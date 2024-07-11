import { ReloadIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

function LoadingSpinner({ className }: { className?: string }) {
  return <ReloadIcon className={cn('animate-spin', className)} />;
}

export default LoadingSpinner;
