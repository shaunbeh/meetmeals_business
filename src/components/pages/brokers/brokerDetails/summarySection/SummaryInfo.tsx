import Image from 'next/image';
import BrokerLevel from 'public/images/png/brokerLevel.png';
import BrokerLogo from 'public/images/png/brokerLogo.jpeg';
import text from 'public/locales/fa/brokerDetails.json';

import RateBroker from './RateBroker';
import SummaryGroupBtns from './SummaryGroupBtns';

const SummaryInfo = ({ brokerLevel }: { brokerLevel: string }) => (
  <div className='flex items-center gap-7 pb-10' id='summary'>
    {/* img part */}
    <div
      className={`${
        brokerLevel === '1'
          ? '[border-image:linear-gradient(to_top_left,#c45f51,_#fae6da_24%,_#ffaa87_44%,_#ffc3b3_66%,_#ffbeb2_85%,_#e99a7f)_10_10]'
          : ''
      } hidden -translate-y-3/4 border-8 lg:block 2xl:-translate-y-1/2`}
    >
      <Image
        className=' w-[200px] border-4 border-black'
        alt='broker-logo'
        width={100}
        height={100}
        src={BrokerLogo}
        quality={100}
      />
    </div>
    {/* info part */}
    <div className='relative flex w-full flex-col gap-5'>
      <div
        className={`mt-5 flex w-fit items-center  gap-2 p-2 ${
          brokerLevel === '1' ? 'bg-level1' : ''
        }`}
      >
        <Image src={BrokerLevel} alt='primium-logo' width={16} height={16} />
        <span className='text-xs font-bold'>
          {text.summarySection.brokerLevel}
        </span>
      </div>
      <RateBroker rate='7.5' reviews='29' color='#e2a18b' />
      <div className='grid w-[420px] grid-cols-2 items-center gap-4'>
        <p className='min-w-[244px] text-sm'>
          {text.summarySection.founded}:
          <span className='mr-1 font-bold'>2019</span>
        </p>
        <p className='min-w-[244px] text-sm'>
          {text.summarySection.headquarters}:
          <span className='mr-1 font-bold'>seycheles</span>
        </p>
        <p className='min-w-[244px] text-sm'>
          {text.summarySection.minDeposit}:
          <span className='mr-1 font-bold'>10 USD</span>
        </p>
        <p className='flex min-w-[244px] text-sm'>
          {text.summarySection.maxLev}:
          <span className='mr-1 font-bold'>1:1000</span>
        </p>
      </div>
      <SummaryGroupBtns />
    </div>
  </div>
);

export default SummaryInfo;
