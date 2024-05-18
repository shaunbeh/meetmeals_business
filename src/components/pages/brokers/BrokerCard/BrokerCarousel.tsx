import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function CarouselDemo() {
  return (
    <div className='relative mx-auto w-full max-w-screen-sm overflow-hidden bg-orange-500'>
      <Carousel>
        <CarouselContent>
          {/* Your carousel items go here */}
          <CarouselItem>hii</CarouselItem>
          <CarouselItem>bye</CarouselItem>
          {/* ... more items */}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
