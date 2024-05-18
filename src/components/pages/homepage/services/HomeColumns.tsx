import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import type { TableRowT } from './types';

const columnHelper = createColumnHelper<TableRowT>();
const MemoizedCellComponent = ({
  value,
  icon,
  symbol,
}: {
  value: string;
  icon: string;
  symbol: string;
}) => (
  <Link
    href={`/coins/${symbol}`}
    className='flex items-center justify-end gap-2'
  >
    <span>
      {icon ? (
        <Image src={icon} width={24} height={24} alt={`${symbol} icon`} />
      ) : null}
    </span>
    <div className='flex grow flex-col items-start'>
      <span className='font-bold'>{value}</span>
      <span className='text-gray-500'>{symbol}</span>
    </div>
  </Link>
);
const MemoizedCell = memo(MemoizedCellComponent);

export const pairsColumns = [
  columnHelper.display({
    header: '#',
    cell: (info) => info.row.original.idx ?? info.row.index + 1,
  }),
  columnHelper.accessor('name', {
    header: 'ارز دیجیتال',
    cell: ({ row, getValue }) => (
      <MemoizedCell
        value={getValue()}
        symbol={row.original.symbol}
        icon={row.original.icon}
      />
    ),
  }),
  columnHelper.accessor('price', {
    header: 'قیمت روز',
    cell: ({ getValue }) => (
      <div className='flex w-36 items-center justify-center gap-1 font-bold'>
        <span>$</span>
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('priceTmn', {
    header: 'قیمت تومانی',
    cell: ({ getValue }) => (
      <div className='flex w-36 items-center justify-center gap-1 font-bold'>
        <span>تومان</span>
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('volume', {
    header: 'معاملات روزانه',
    cell: ({ getValue }) => (
      <div className='flex w-36 items-center justify-center gap-1 font-bold'>
        <span>$</span>
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('marketCap', {
    header: 'حجم بازار',
    cell: ({ getValue }) => (
      <div className='flex w-36 items-center justify-center gap-1'>
        <span>$</span>
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('priceChange24h', {
    header: 'روزانه',
    cell: ({ getValue }) => (
      <div
        className={clsx(
          'flex w-20 items-center justify-center gap-1',
          +getValue() > 0 ? 'text-green-500' : 'text-red-400',
        )}
      >
        {getValue()}
        <span>%</span>
      </div>
    ),
  }),
  columnHelper.accessor('priceChange7d', {
    header: 'هفتگی',
    cell: ({ getValue, row }) => (
      <Link href={`/coins/${row.original.symbol.toLowerCase()}`}>
        <div
          className={clsx(
            'flex w-20 items-center justify-center gap-1',
            +getValue() > 0 ? 'text-green-500' : 'text-red-400',
          )}
        >
          {getValue()}
          <span>%</span>
        </div>
      </Link>
    ),
  }),
];
