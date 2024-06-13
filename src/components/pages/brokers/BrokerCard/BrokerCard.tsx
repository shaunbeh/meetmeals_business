// BrokerCard.tsx
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import BrokerInfo from './BrokerInfo';

export type BrokerCardDataT = {
  data: {
    slug: string;
    title: string;
    rank: string;
    regulators: string;
    logo: string;
    minDeposit: string;
    desc: string;
    maxLev: string;
    avgSpread: string;
  };
};

export default function BrokerCard({ data }: BrokerCardDataT) {
  const { slug, title, logo, minDeposit, maxLev, avgSpread, desc } = data;
  return (
    <Link
      href={`/brokers/${slug}`}
      className='flex w-full cursor-pointer justify-between border bg-card p-5 hover:border-none hover:shadow-lg'
    >
      <div className='flex items-center gap-7'>
        <div className='flex flex-col items-center gap-2'>
          <Image src={logo} alt={`${title} logo`} width={140} height={105} />
          <Button
            size='lg'
            variant='outline'
            className='border-amber-300 font-medium'
          >
            Open Account
          </Button>
        </div>
        <BrokerInfo data={data} />
      </div>
      {/* <BrokerCarousel /> */}
      <div className='hidden flex-col justify-center ps-2.5 sm:flex'>
        <p className='max-w-[20ch] truncate'>{desc}</p>
        <p className='flex items-center justify-between'>
          <span>Min Deposit</span>
          <span>{minDeposit}</span>
        </p>
        <p className='flex items-center justify-between'>
          <span>Max Lev</span>
          <span>{maxLev}</span>
        </p>
        <p className='flex items-center justify-between'>
          <span>Avg Spread</span>
          <span>{avgSpread}</span>
        </p>
      </div>
    </Link>
  );
}
