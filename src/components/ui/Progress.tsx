import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, color, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-[6px] w-full overflow-hidden  bg-progress',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className='size-full flex-1 bg-black transition-all'
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        background: color || '#000',
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
