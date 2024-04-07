import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { TagItem } from '@/lib/schema/ApiTypes';

export default function HomepageTableHeader({
  search,
  setSearchText,
  handleSearchTag,
  tag,
  tagsList,
}: {
  search: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  handleSearchTag: (tag: string) => void;
  tag: string | null;
  tagsList: TagItem[];
}) {
  return (
    <div className='flex flex-col gap-4 w-full mx-auto'>
      <div className='flex justify-between items-center'>
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
        {tagsList?.map((t) => (
          <Button
            key={t.id}
            variant='secondary'
            onClick={() =>
              t.key == 'all' ? handleSearchTag('') : handleSearchTag(t.key)
            }
            className={clsx(
              tag == 'all'
                ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
                : 'hover:bg-primary/30',
              'rounded-3xl px-3 py-1 h-7'
            )}
          >
            {t.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
