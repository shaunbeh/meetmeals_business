import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';

import type { TagItem } from '@/lib/schema/ApiTypes';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

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
    <div className='mx-auto flex w-full flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='relative'>
          <Input
            value={search}
            onChange={(e) => setSearchText(e.target.value)}
            className='border-none bg-muted ps-10 text-popover-foreground'
            type='search'
            placeholder=' جستجو در بازار'
          />
          <MagnifyingGlassIcon className='absolute right-2 top-2.5 size-6 rotate-90 text-input' />
        </div>
        <div className='flex items-center gap-2'>
          <Link
            className='rounded-lg bg-primary/50 px-3 py-1 font-bold leading-8 text-black/70  hover:bg-primary hover:text-white'
            href='/calculator'
          >
            ماشین حساب
          </Link>
          <Link
            className='rounded-lg bg-primary/50 px-3 py-1 font-bold leading-8 text-black/70  hover:bg-primary hover:text-white'
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
              t.key === 'all' ? handleSearchTag('') : handleSearchTag(t.key)
            }
            className={clsx(
              tag === 'all'
                ? 'bg-popover-foreground text-popover hover:bg-popover hover:text-popover-foreground'
                : 'hover:bg-primary/30',
              'h-7 rounded-3xl px-3 py-1',
            )}
          >
            {t.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
