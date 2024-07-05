import { Clock } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';

const OrderCard = () => (
  <div className='flex min-h-36 min-w-[640px] gap-4 rounded-lg bg-surface-secondary p-4'>
    <div className='flex size-36 flex-col items-center justify-center rounded-lg border border-line-primary p-2'>
      <div className='font-bold'>Monday</div>
      <div className='text-button-light'>28 June</div>
    </div>
    <div className='flex grow flex-col justify-between rounded-lg'>
      <div className='flex justify-between'>
        <div className='font-bold'>Home made lunch package</div>
        <div>5$</div>
      </div>
      <div className='flex h-8 items-center justify-between'>
        <div className='flex gap-1'>
          <Clock className='text-icon-primary' />
          <span>12:00 - 13:00</span>
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
  const router = useRouter();
  const { user } = useAppStore();

  useEffect(() => {
    if (!user.token) router.push('/login');
  }, [user, router]);

  return (
    <Layout>
      <div className='flex px-6 py-4'>
        <div className='hidden h-full w-1/3 flex-col lg:flex' />
        <div className='flex flex-col items-center justify-center gap-5' />
        <div className='flex flex-col gap-4'>
          {new Array(5).fill(0).map((_, i) => (
            <OrderCard key={i} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
