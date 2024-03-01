import { Getter, Row, createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';
import clsx from 'clsx';
import { TableRowT } from './types';
import Link from 'next/link';
import { memo } from 'react';

const columnHelper = createColumnHelper<TableRowT>();
const MemoizedCell = memo(function MC({
  value,
  icon,
  symbol,
}: {
  value: string;
  icon: string;
  symbol: string;
}) {
  return (
    <Link
      href={`/coins/${symbol}`}
      className='flex justify-end gap-2 items-center'
    >
      <span>
        {icon ? (
          <Image src={icon} width={24} height={24} alt={`${symbol} icon`} />
        ) : null}
      </span>
      <div className='flex flex-col items-start grow'>
        <span className='font-bold'>{value}</span>
        <span className='text-gray-500'>{symbol}</span>
      </div>
    </Link>
  );
});
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
  columnHelper.accessor('volume', {
    header: 'معاملات روزانه',
    cell: ({ getValue }) => (
      <div className='w-36 gap-1 text-bold flex items-center justify-center'>
        <span>$</span>
        {getValue()}
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
  columnHelper.accessor('priceChange7d', {
    header: 'هفتگی',
    cell: ({ getValue, row }) => (
      <Link href={`/coins/${row.original.symbol.toLowerCase()}`}>
        <div
          className={clsx(
            'w-20 gap-1 flex items-center justify-center',
            +getValue() > 0 ? 'text-green-500' : 'text-red-400'
          )}
        >
          {getValue()}
          <span>%</span>
        </div>
      </Link>
    ),
  }),
];
