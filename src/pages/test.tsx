import BrokerCard from '@/components/pages/brokers/BrokerCard/BrokerCard';
import CarouselDemo from '@/components/pages/brokers/BrokerCard/BrokerCarousel';
import SimpleKeyboard from '@/components/simpleKeyboard';

export default function Test() {
  return (
    <div className='flex outline justify-center items-center h-screen'>
      {/* <BrokerCard />
      <CarouselDemo /> */}
      <SimpleKeyboard />
    </div>
  );
}
