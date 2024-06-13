import clsx from 'clsx';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React, { useRef } from 'react';

type PropsT = {
  items: React.ReactNode[];
};

const TopPicksTabCarousel: React.FC<PropsT> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollWidth = () => carouselRef.current?.offsetWidth || 0;

  const handleNext = () => {
    carouselRef.current?.scrollBy({ left: scrollWidth(), behavior: 'smooth' });
  };

  const handlePrev = () => {
    carouselRef.current?.scrollBy({ left: -scrollWidth(), behavior: 'smooth' });
  };

  return (
    <div className='flex w-full items-center'>
      <button
        onClick={handlePrev}
        className='rounded-l px-4 py-2 font-bold text-gray-800'
        aria-label='Previous'
      >
        <ArrowLeft2 className='size-4' />
      </button>
      <div
        className='flex h-full snap-x snap-mandatory items-end overflow-hidden overflow-x-auto scroll-smooth px-4'
        ref={carouselRef}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              'first:cursor-default first:rounded-none first:border-b-2 first:border-primary first:hover:bg-inherit',
              ' min-w-36 cursor-pointer snap-start rounded-sm border-b px-5 py-1 text-center text-sm   hover:bg-slate-400/10',
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <button
        className='rounded-r px-4 py-2 font-bold text-gray-800'
        onClick={handleNext}
        aria-label='Next'
      >
        <ArrowRight2 className='size-4' />
      </button>
    </div>
  );
};

export default TopPicksTabCarousel;
