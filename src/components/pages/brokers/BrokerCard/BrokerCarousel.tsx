import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function CarouselDemo() {
  return (
    <div className='relative w-full bg-orange-500 max-w-screen-sm mx-auto overflow-hidden'>
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
