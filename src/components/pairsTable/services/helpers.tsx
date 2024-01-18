import { createColumnHelper } from '@tanstack/react-table';
import { TableRowT } from './types';
import Image from 'next/image';
import clsx from 'clsx';

const columnHelper = createColumnHelper<TableRowT>();
export const pairsColumns = [
  columnHelper.accessor('priceChange7d', {
    header: 'هفتگی',
    cell: ({ getValue }) => (
      <div
        className={clsx(
          'w-20 gap-1 flex items-center justify-center',
          +getValue() > 0 ? 'text-green-500' : 'text-red-400'
        )}
      >
        {getValue()}
        <span>%</span>
      </div>
    ),
  }),
  columnHelper.accessor('priceChange24h', {
    header: 'روزانه',
    cell: ({ getValue }) => (
      <div
        className={clsx(
          'w-20 gap-1 flex items-center justify-center',
          +getValue() > 0 ? 'text-green-500' : 'text-red-400'
        )}
      >
        {getValue()}
        <span>%</span>
      </div>
    ),
  }),
  columnHelper.accessor('marketCap', {
    header: 'حجم بازار',
    cell: ({ getValue }) => (
      <div className='w-36 gap-1 flex items-center justify-center'>
        <span>$</span>
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('volume', {
    header: 'معاملات روزانه',
    cell: ({ getValue }) => (
      <div className='w-36 gap-1 text-bold flex items-center justify-center'>
        <span>$</span>
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('priceTmn', {
    header: 'قیمت تومانی',
    cell: ({ getValue }) => (
      <div className='w-36 gap-1 text-bold flex items-center justify-center'>
        <span>تومان</span>
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('price', {
    header: 'قیمت روز',
    cell: ({ getValue }) => (
      <div className='w-36 gap-1 text-bold flex items-center justify-center'>
        <span>$</span>
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('name', {
    header: 'ارز دیجیتال',
    cell: ({ row, getValue }) => (
      <div className='flex justify-end gap-2 items-center'>
        <div className='flex flex-col items-end'>
          <span className='font-bold'>{getValue()}</span>
          <span className='text-gray-500'>{row.original.symbol}</span>
        </div>
        <span>
          {row.original.icon ? (
            <Image
              src={row.original.icon}
              width={24}
              height={24}
              alt={`${row.original.symbol} icon`}
            />
          ) : null}
        </span>
      </div>
    ),
  }),
  columnHelper.display({
    header: '#',
    cell: (info) => info.row.index + 1,
  }),
];
