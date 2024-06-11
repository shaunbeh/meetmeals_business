import type { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import CustomTable from './CustomTabe';

const fakeData = [
  {
    depositMethod: '/images/png/bank.png',
    commission: 0,
    exchangeRate: '',
    proccessingTime: 'Instant',
  },
  {
    depositMethod: '/images/png/bank.png',
    commission: 0,
    exchangeRate: '',
    proccessingTime: 'Instant',
  },
  {
    depositMethod: '/images/png/bank.png',
    commission: 0,
    exchangeRate: '',
    proccessingTime: 'Instant',
  },
  {
    depositMethod: '/images/png/bank.png',
    commission: 0,
    exchangeRate: '',
    proccessingTime: 'Instant',
  },
  {
    depositMethod: '/images/png/bank.png',
    commission: 0,
    exchangeRate: '',
    proccessingTime: 'Instant',
  },
  {
    depositMethod: '/images/png/bank.png',
    commission: 0,
    exchangeRate: '',
    proccessingTime: 'Instant',
  },
];
const DepositTable = () => {
  const depositeColumns: ColumnDef<(typeof fakeData)[0]>[] = [
    {
      header: 'Deposit Method',
      accessorKey: 'depositMethod',
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (
        <div className='mx-2 flex size-full items-center justify-center'>
          <Image
            width={100}
            height={100}
            src={String(row.getValue())}
            alt='Deposit Method'
            className='h-[44px] w-[58px]'
          />
        </div>
      ),
    },
    {
      header: 'Commission',
      accessorKey: 'commission',
    },
    {
      header: 'Exchange Rate',
      accessorKey: 'exchangeRate',
    },
    {
      header: 'Processing Time',
      accessorKey: 'proccessingTime',
    },
  ];
  return <CustomTable data={fakeData} columns={depositeColumns} />;
};

export default DepositTable;
