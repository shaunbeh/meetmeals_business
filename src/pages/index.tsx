import { BrokerCard } from '@/components/pages/brokers/BrokerCard';
import BrokersSideMenu from '@/components/pages/brokers/BrokersSideMenu';
import TopPicksTabCarousel from '@/components/ui/TopPicksTabsCarousel';
import { brokers, topPicks } from '@/constants/dummyData';

export default function Home() {
  return (
    <div className='flex px-6 py-4'>
      <div className='hidden h-full w-1/3 flex-col lg:flex'>
        <BrokersSideMenu />
      </div>
      <div className='flex flex-col items-center justify-center gap-5'>
        <TopPicksTabCarousel items={topPicks} />
        {brokers.map((broker) => (
          <BrokerCard key={broker.slug} data={broker} />
        ))}
      </div>
    </div>
  );
}
