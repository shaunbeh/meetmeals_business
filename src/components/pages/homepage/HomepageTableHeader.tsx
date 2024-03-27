import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export default function HomepageTableHeader({
  search,
  setSearchText,
  handleSearchTag,
  tag,
}: {
  search: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  handleSearchTag: (tag: string) => void;
  tag: string | null;
}) {
  return (
    <div className='flex flex-col gap-4 px-4'>
      <div className='flex justify-between outline items-center'>
        <div className='relative'>
          <Input
            value={search}
            onChange={(e) => setSearchText(e.target.value)}
            className='ps-10 bg-muted text-popover-foreground border-none'
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
        <Button
          variant='secondary'
          onClick={() =>
            tag == 'all' ? handleSearchTag('') : handleSearchTag('all')
          }
          className={clsx(
            tag == 'all'
              ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
              : 'hover:bg-primary/30',
            'rounded-3xl px-3 py-1 h-7'
          )}
        >
           همه
        </Button>
        <Button
          variant='secondary'
          onClick={() =>
            tag == 'defi' ? handleSearchTag('') : handleSearchTag('defi')
          }
          className={clsx(
            tag == 'defi'
              ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
              : 'hover:bg-primary/30',
            'rounded-3xl px-3 py-1 h-7'
          )}
        >
          دیفای
        </Button>
        <Button
          variant='secondary'
          onClick={() =>
            tag == 'stable' ? handleSearchTag('') : handleSearchTag('stable')
          }
          className={clsx(
            tag == 'stable'
              ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
              : 'hover:bg-primary/30',
            'rounded-3xl px-3 py-1 h-7'
          )}
        >
          استیبل کوین
        </Button>
        <Button
          variant='secondary'
          onClick={() =>
            tag == 'metaverse'
              ? handleSearchTag('')
              : handleSearchTag('metaverse')
          }
          className={clsx(
            tag == 'metaverse'
              ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
              : 'hover:bg-primary/30',
            'rounded-3xl px-3 py-1 h-7'
          )}
        >
          متاورس{' '}
        </Button>
        <Button
          variant='secondary'
          onClick={() =>
            tag == 'nft' ? handleSearchTag('') : handleSearchTag('nft')
          }
          className={clsx(
            tag == 'nft'
              ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
              : 'hover:bg-primary/30',
            'rounded-3xl px-3 py-1 h-7'
          )}
        >
          NFT{' '}
        </Button>
        <Button
          variant='secondary'
          onClick={() =>
            tag == 'web3' ? handleSearchTag('') : handleSearchTag('web3')
          }
          className={clsx(
            tag == 'web3'
              ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
              : 'hover:bg-primary/30',
            'rounded-3xl px-3 py-1 h-7'
          )}
        >
          وب ۳{' '}
        </Button>
        <Button
          variant='secondary'
          onClick={() =>
            tag == 'ai' ? handleSearchTag('') : handleSearchTag('ai')
          }
          className={clsx(
            tag == 'ai'
              ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
              : 'hover:bg-primary/30',
            'rounded-3xl px-3 py-1 h-7'
          )}
        >
          هوش مصنوعی{' '}
        </Button>
      </div>
    </div>
  );
}
