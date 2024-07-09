/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable tailwindcss/no-custom-classname */
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, LogoutCurve } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import type { ColumnsType } from 'rc-table';
import { useState } from 'react';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import BasicTable from '@/components/ui/Table/BasicTable';
import endpoints from '@/lib/constants/endpoints';
import type {
  GetOrdersApiResponse,
  GetUserInfoApiResponse,
  OrderT,
} from '@/lib/types/ApiTypes';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

const orderColumns: ColumnsType<OrderT> = [
  {
    title: '#',
    key: 'order_number',
    width: '80px',
    render: (_, __, i) => <span>{i + 1}</span>,
  },
  {
    title: 'Order Number',
    dataIndex: 'order_number',
    width: '150px',
  },
  {
    title: 'Dietary',
    width: '150px',
    dataIndex: 'dietary',
  },
  { title: 'Order Date', dataIndex: 'order_date' },
  { title: 'Delivery Date', dataIndex: 'delivery_date' },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (value) => <div className=''>€{value}</div>,
  },
  {
    title: 'Order Status',
    dataIndex: 'status',
    key: 'status',
    width: '150px',
    render: (value) => (
      <div
        className={cn(
          'capitalize mx-4 ring-1 rounded-full',
          value.id === 3 && 'ring-red bg-red text-text-tertiary',
          value.id === 1 && 'ring-secondary text-secondary',
        )}
      >
        {value.name.split('-').join(' ')}
      </div>
    ),
  },
];

export default function Account() {
  // HOOKS
  const {
    auth: { isLoggedIn, token },
  } = useAppStore();
  const { updateUserInfoAfterLogout } = useAppStore();
  const router = useRouter();

  // STATES
  const [currPage, setCurrPage] = useState(1);

  // API CALLS
  const { data: userInfo } = useQuery<GetUserInfoApiResponse>({
    queryKey: [endpoints.getUserInfo.url, { token }],
    enabled: isLoggedIn,
  });

  const { data } = useQuery<GetOrdersApiResponse>({
    queryKey: [endpoints.getOrders.url, { token }],
    enabled: isLoggedIn,
  });

  // FUNCTIONS
  const handleBack = () => {
    router.push('/');
  };

  const handleLogout = () => {
    updateUserInfoAfterLogout();
    router.push('/login');
  };

  const handlePageChange = (newPage: number) => {
    setCurrPage(newPage);
  };

  const d = data?.data;
  const user = userInfo?.data;
  let pageCount = 1;
  if (d?.total && d?.per_page) {
    pageCount = Math.ceil(d.total / d.per_page);
  }

  return (
    <Layout title='Account'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-6 py-6 lg:px-4 xl:px-14'>
        <div className='flex items-center justify-between'>
          <Button
            onClick={handleBack}
            variant='ghost'
            className='relative -m-2 flex items-center gap-2 rounded-lg p-2 ps-10 font-bold text-black transition-all hover:bg-surface-background [&>#arrow]:hover:opacity-100 [&>#chevron]:hover:translate-x-0 [&>#chevron]:hover:scale-150 [&>#chevron]:hover:opacity-0 [&>svg]:hover:scale-110'
          >
            <ChevronLeftIcon
              id='chevron'
              className='absolute start-1 w-6 translate-x-3 scale-125 text-icon-primary transition-all'
            />
            <ArrowLeft
              id='arrow'
              className='absolute start-2 w-6 text-icon-primary opacity-0 transition-all'
            />{' '}
            Back
          </Button>
          <Button
            onClick={handleLogout}
            variant='outline'
            className='flex gap-2 border-red text-red hover:text-red'
          >
            <LogoutCurve size={24} />
            <span className='text-sub2-bold'>Logout</span>
          </Button>
        </div>
        <div className='flex flex-col gap-4 rounded-lg border border-line-primary p-4'>
          <h2 className='text-sub2-bold text-text-primary'>
            Personal Information
          </h2>
          <div className='flex flex-wrap gap-x-2 gap-y-6'>
            <InfoItem label='First name' value={user?.first_name ?? ''} />
            <InfoItem label='Last name' value={user?.last_name ?? ''} />
            <InfoItem label='Work email' value={user?.email ?? ''} />
            <InfoItem
              label='Phone number'
              value={user?.mobile?.toString() ?? ''}
            />
            <InfoItem
              label='Company name'
              value={user?.organization?.name ?? ''}
            />
            <InfoItem
              label='Address'
              value={user?.organization?.address ?? ''}
            />
          </div>
        </div>
        <div className='rounded-lg border border-line-primary p-4'>
          <BasicTable
            className='reactTable'
            columns={orderColumns}
            data={d?.data ?? []}
          />
          {d?.data.length ? (
            <Pagination>
              <PaginationContent>
                {d?.prev_page_url ? (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currPage - 1)}
                      href='#'
                    />
                  </PaginationItem>
                ) : (
                  ''
                )}
                {new Array(pageCount).fill(0).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href='#'
                      onClick={() => handlePageChange(i + 1)}
                      isActive={i + 1 === currPage}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {d?.next_page_url ? (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currPage + 1)}
                      href='#'
                    />
                  </PaginationItem>
                ) : (
                  ''
                )}
              </PaginationContent>
            </Pagination>
          ) : (
            ''
          )}
        </div>
      </div>
    </Layout>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className='flex min-w-[30%] items-center gap-2 text-par-medium'>
    <span className='text-par-medium text-text-disabled'>{label}</span>
    <span className='text-text-primary'>{value}</span>
  </div>
);
