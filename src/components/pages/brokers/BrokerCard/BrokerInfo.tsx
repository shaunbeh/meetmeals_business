import { Star1 } from 'iconsax-react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';

import type { BrokerCardDataT } from './BrokerCard';

export default function BrokerInfo({ data }: BrokerCardDataT) {
  const { title, rank, regulators } = data;
  return (
    <div className='flex flex-col gap-2.5'>
      <div className='flex flex-col'>
        <h2 className='text-xl font-bold leading-8'>{title}</h2>
        <div className='flex gap-2 bg-amber-300/40 px-2 text-xs font-bold leading-6'>
          <div className='p-1'>
            <Image
              src='https://pc-cdn.brokersview.com/pc-cdn/1712657022126/img/broker_level_2.d93d84e3.png'
              alt='crown icon'
              width={16}
              height={16}
            />
          </div>
          <span>{rank}</span>
        </div>
      </div>
      <div className='flex gap-0.5'>
        <div className='bg-secondary-foreground p-1'>
          <Star1 className='size-4 bg-secondary-foreground fill-amber-300 text-amber-300' />
        </div>
        {/* ... */}
      </div>
      <p className='mb-2 text-sm font-normal leading-5'>
        Regulators: {regulators}
      </p>
      <label
        className='flex items-center gap-2 text-sm font-medium leading-5'
        htmlFor='compare'
      >
        <Input className='size-5' type='checkbox' />
        Add to Compare
      </label>
    </div>
  );
}
