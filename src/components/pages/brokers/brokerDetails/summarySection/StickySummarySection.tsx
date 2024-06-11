import Image from 'next/image';
import BrokerLogo from 'public/images/png/brokerLogo.jpeg';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';

import WhiteCard from '../WhiteCard';
import RateBroker from './RateBroker';
import SummaryGroupBtns from './SummaryGroupBtns';

const StickySummarySection = ({
  scrollToSection,
  currentSection,
}: {
  scrollToSection: (sectionId: string) => void;
  currentSection: string;
}) => {
  const TabsTriggerClasses =
    'data-[state=active]:border-b-4 border-level1-foreground h-full data-[state=active]:text-md data-[state=active]:font-bold data-[state=active]:transition-colors';
  return (
    <WhiteCard className='fixed top-[64px] z-50 hidden px-5 !pb-0 shadow-xl xl:block'>
      <div className='flex items-center justify-between py-5'>
        <div className='flex items-center gap-2'>
          <Image
            className='w-[100px]'
            alt='broker-logo'
            width={100}
            height={75}
            src={BrokerLogo}
            quality={100}
          />
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>wetrade</span>
            <RateBroker rate='7.5' reviews='29' color='#e2a18b' />
          </div>
        </div>
        <SummaryGroupBtns className='2xl:static' hideBtn />
      </div>
      <Tabs value={currentSection} defaultValue='account' dir='rtl'>
        <TabsList className='p-0'>
          <TabsTrigger
            className={TabsTriggerClasses}
            value='account'
            onClick={() => scrollToSection('account')}
          >
            Account & Cost
          </TabsTrigger>
          <TabsTrigger
            className={TabsTriggerClasses}
            value='deposit'
            onClick={() => scrollToSection('deposit')}
          >
            Deposit & Withdrawal
          </TabsTrigger>
          <TabsTrigger
            className={TabsTriggerClasses}
            value='company'
            onClick={() => scrollToSection('company')}
          >
            Company & Service
          </TabsTrigger>
          <TabsTrigger
            className={TabsTriggerClasses}
            value='news'
            onClick={() => scrollToSection('news')}
          >
            News
          </TabsTrigger>
          <TabsTrigger
            className={TabsTriggerClasses}
            value='Q&A'
            onClick={() => scrollToSection('Q&A')}
          >
            Related Complaints
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </WhiteCard>
  );
};

export default StickySummarySection;
