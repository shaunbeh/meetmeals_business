import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

export default function TableHeader({
  search,
  setSearchText,
}: {
  search: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className='flex flex-col gap-4 dir-rtl px-4'>
      <div className='flex justify-between items-center'>
        <div className='relative'>
          <Input
            value={search}
            onChange={(e) => setSearchText(e.target.value)}
            className='ps-10 bg-muted text-input border-none'
            type='search'
            placeholder=' جستجو در بازار'
          />
          <MagnifyingGlassIcon className='absolute text-input rotate-90 right-2 top-2.5 w-6 h-6' />
        </div>
        <div className='flex items-center gap-2'>
          <Link
            className='bg-primary/50 text-black/70 hover:bg-primary hover:text-white text-white leading-8 font-bold px-3 py-1 rounded-lg'
            href='/calculator'
          >
             ماشین حساب
          </Link>
          <Link
            className='bg-primary/50 text-black/70 hover:bg-primary hover:text-white text-white leading-8 font-bold px-3 py-1 rounded-lg'
            href='/comparison'
          >
            مقایسه
          </Link>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
           همه
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
             قرارداد هوشمند
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          اوراکل
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          دیفای
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          استیبل کوین
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          توکن صرافی
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          متاورس{' '}
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          NFT{' '}
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          میم کوین{' '}
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          وب ۳{' '}
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          هوش مصنوعی{' '}
        </Button>
        <Button variant='secondary' className='rounded-3xl px-3 py-1 h-7'>
          توکن بازی{' '}
        </Button>
      </div>
    </div>
  );
}
