import ClockIcon from 'public/images/svg/clock.svg';

import WhiteCard from '../WhiteCard';

type NewsCardPropsType = {
  title: string;
  date: string;
  content: string;
};
const NewsCard = ({ title, date, content }: NewsCardPropsType) => (
  <div className='min-h-[127px] cursor-pointer bg-secondary/50 p-5'>
    <div className='flex items-center justify-between'>
      <span className='ml-4 w-[367px] overflow-hidden truncate font-bold '>
        {title}
      </span>
      <div className='flex items-center gap-1 whitespace-nowrap text-xs text-secondary-foreground/50'>
        <ClockIcon className='size-4' />
        <span>{date}</span>
      </div>
    </div>
    <span>{content}</span>
  </div>
);

const BrokerNewsSection = ({ id }: { id: string }) => (
  <WhiteCard className='flex min-h-[400px] flex-col justify-between pt-10'>
    <h2 className='text-2xl font-bold' id={id}>
      Broker News
    </h2>
    <div className='mt-2 grid grid-cols-1 gap-5 lg:grid-cols-2'>
      <NewsCard
        title='Congratulations to the Excellent Brokers for Winning the Live Trading Assessment Awards at the 2024 Award for BrokersView with Outstanding Assessment Ceremony'
        date='2024-05-10'
        content='Cheer for the excellence presented by the amazing brokers and look forward to a brighter future in the online trading arena.'
      />
      <NewsCard
        title='Congratulations to the Excellent Brokers for Winning the Live Trading Assessment Awards at the 2024 Award for BrokersView with Outstanding Assessment Ceremony'
        date='2024-05-10'
        content='Cheer for the excellence presented by the amazing brokers and look forward to a brighter future in the online trading arena.'
      />
    </div>
    <div className='mt-6 flex w-full items-center justify-center'>
      <button className='flex h-10 w-[180px] items-center justify-center border border-black/20 hover:border-level1-foreground hover:bg-level1-foreground'>
        See all
      </button>
    </div>
  </WhiteCard>
);

export default BrokerNewsSection;
