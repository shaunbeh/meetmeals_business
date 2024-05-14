// BrokerCard.tsx
import BrokerLogo from './BrokerLogo';
import BrokerInfo from './BrokerInfo';
import BrokerCarousel from './BrokerCarousel';

export default function BrokerCard() {
  return (
    <div className='flex border bg-card p-5 gap-7 hover:shadow-lg hover:border-none cursor-pointer'>
      <BrokerLogo />
      <BrokerInfo />
      <BrokerCarousel />
    </div>
  );
}
