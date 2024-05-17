// BrokerCard.tsx
import BrokerCarousel from './BrokerCarousel';
import BrokerInfo from './BrokerInfo';
import BrokerLogo from './BrokerLogo';

export default function BrokerCard() {
  return (
    <div className='flex cursor-pointer gap-7 border bg-card p-5 hover:border-none hover:shadow-lg'>
      <BrokerLogo />
      <BrokerInfo />
      <BrokerCarousel />
    </div>
  );
}
