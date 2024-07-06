import { useQuery } from '@tanstack/react-query';
import { Clock } from 'iconsax-react';
import { DateTime } from 'luxon';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import endpoints from '@/lib/constants/endpoints';
import type { GetPlansApiResponse, PlanT } from '@/lib/types/ApiTypes';
import { useAppStore } from '@/store';

const OrderCard = ({ plan }: { plan: PlanT }) => (
  <div className='flex h-36 min-w-[640px] gap-4 rounded-lg bg-surface-secondary p-4'>
    <div className='flex size-[112px] flex-col items-center justify-center rounded-lg border border-line-primary p-2'>
      <div className='font-bold'>
        {DateTime.fromFormat(plan.date, 'yyyy-MM-dd').weekdayLong}
      </div>
      <div className='text-button-light'>28 June</div>
    </div>
    <div className='flex grow flex-col justify-between rounded-lg'>
      <div className='flex justify-between'>
        <div className='font-bold'>{plan.title}</div>
        <div className='flex items-center gap-1 font-bold'>
          <span
            className={
              plan.discounted_price
                ? 'text-text-disabled line-through'
                : 'text-h2-bold text-text-primary'
            }
          >
            {plan.price}€
          </span>
          {!!plan.discounted_price && (
            <span className='text-h2-bold'>{plan.discounted_price}€</span>
          )}
        </div>
      </div>
      <div className='flex h-8 items-center justify-between'>
        <div className='flex gap-1'>
          <Clock className='text-icon-primary' />
          <span>{`${plan.start_time} - ${plan.end_time}`}</span>
        </div>
        <Button variant='default' className='font-bold'>
          Place order
        </Button>
      </div>
    </div>
  </div>
);

export default function Home() {
  // const { data: plansData } = useQuery({
  //   queryKey: [endpoints.getPlans.url, {}],
  // });
  // const router = useRouter();
  const { user } = useAppStore();

  // useEffect(() => {
  //   console.log(user.token, 'token');
  //   if (!user.token) router.push('/login');
  // }, [user, router]);

  const { data, isLoading } = useQuery<GetPlansApiResponse>({
    queryKey: [endpoints.getPlans.url, { token: user.token }],
  });

  return (
    <Layout>
      <div className='mx-auto flex px-6 py-4'>
        <div className='hidden h-full w-1/3 flex-col lg:flex' />
        <div className='flex flex-col items-center justify-center gap-5' />
        <div className='flex flex-col gap-4'>
          {isLoading ? (
            <>
              <Skeleton className='h-36 w-[640px]' />
              <Skeleton className='h-36 w-[640px]' />
              <Skeleton className='h-36 w-[640px]' />
              <Skeleton className='h-36 w-[640px]' />
              <Skeleton className='h-36 w-[640px]' />
            </>
          ) : (
            data?.data.plans.map((plan, i) => <OrderCard plan={plan} key={i} />)
          )}
        </div>
      </div>
    </Layout>
  );
}
