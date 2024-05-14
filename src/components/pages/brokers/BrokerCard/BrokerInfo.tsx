import { Input } from '@/components/ui/input';
import { Star1 } from 'iconsax-react';
import Image from 'next/image';

export default function BrokerInfo() {
  return (
    <div className='flex flex-col gap-2.5'>
      <div className='flex flex-col'>
        <h2 className='font-bold text-xl leading-8'>Just2Trade</h2>
        <div className='flex gap-2 bg-amber-300/40 px-2 leading-6 text-xs font-bold'>
          <div className='p-1'>
            <Image
              src='https://pc-cdn.brokersview.com/pc-cdn/1712657022126/img/broker_level_2.d93d84e3.png'
              alt='crown icon'
              width={16}
              height={16}
            />
          </div>
          <span>WELL-PERFORMING BROKER</span>
        </div>
      </div>
      <div className='flex gap-0.5'>
        <div className='p-1 bg-secondary-foreground'>
          <Star1 className='w-4 h-4 text-amber-300 bg-secondary-foreground fill-amber-300 ' />
        </div>
        {/* ... */}
      </div>
      <p className='font-normal text-sm leading-5 mb-2'>
        Regulators: CySEC, NFA
      </p>
      <label
        className='flex items-center gap-2 text-sm font-medium leading-5'
        htmlFor='compare'
      >
        <Input className='h-5 w-5' type='checkbox' />
        Add to Compare
      </label>
    </div>
  );
}
