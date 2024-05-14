import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function BrokerLogo() {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Image
        src='https://img.brokersview.com/prod/image/20240325/7160a78232a583492238ad931a6f5469.png'
        alt='broker logo'
        width={140}
        height={105}
      />
      <Button
        size='lg'
        variant='outline'
        className='border-amber-300 font-medium'
      >
        Open Account
      </Button>
    </div>
  );
}
