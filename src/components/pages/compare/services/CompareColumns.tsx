import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { GetSymbolsExchangeItemResult } from '@/lib/schema/ApiTypes';
import texts from 'public/locales/fa/fa.json';
import Image from 'next/image';

const columnHelper = createColumnHelper<GetSymbolsExchangeItemResult>();
export const CompareColumns = [
  columnHelper.accessor('title', {
    header: texts.comparison.table.exchange,
    cell: ({ row, getValue }) => (
      <div className='flex gap-2 items-center'>
        <Image
          src={row.original?.logo ?? ''}
          width={24}
          height={24}
          alt={getValue() + ' icon'}
        />
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('ask_price', {
    header: texts.comparison.table.askPrice,
    cell: ({ getValue }) => (
      <div className='gap-1 flex items-center justify-center'>
        <span className='text-xs'>IRT</span>
        <span className='text-sm'>{Number(getValue()).toLocaleString()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('bid_price', {
    header: texts.comparison.table.bidPrice,
    cell: ({ getValue }) => (
      <div className=' gap-1 flex items-center justify-center'>
        <span className='text-xs'>IRT</span>
        <span className='text-sm'>{Number(getValue()).toLocaleString()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('commission', {
    header: texts.comparison.table.commission,
    cell: ({ getValue }) => (
      <div className='text-sm gap-1 flex items-center justify-center'>
        {getValue() ? <>{getValue()}</> : ''}
      </div>
    ),
  }),
  columnHelper.accessor('type', {
    header: texts.comparison.table.type,
    cell: ({ getValue }) => <div className='text-sm'>{getValue()}</div>,
  }),
  columnHelper.accessor('symbols_count', {
    header: texts.comparison.table.symbolsCount,
    cell: ({ getValue }) => <div className='text-sm'>{getValue()}</div>,
  }),
  columnHelper.accessor('sell_link', {
    header: texts.comparison.table.affiliateLink,
    cell: ({ getValue }) => (
      <Link href={getValue() ?? ''} target='_blank'>
        <div className='ring-1 ring-primary text-primary rounded-lg px-6 py-1 text-sm w-fit mx-auto py'>
          {texts.comparison.table.linkButton}
        </div>
      </Link>
    ),
  }),
];
