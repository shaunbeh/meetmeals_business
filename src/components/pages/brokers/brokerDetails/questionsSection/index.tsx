import { TabsContent } from '@radix-ui/react-tabs';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';

import WhiteCard from '../WhiteCard';

const QuesionPart = () => (
  <div className='cursor-pointer'>
    <span className='text-base font-bold hover:underline'>Wetrade چیست؟</span>
    <div className='flex items-center gap-4'>
      <div className='my-4 flex size-6 items-center justify-center rounded-full bg-level1 text-level1-foreground'>
        M
      </div>
      <span>Mihrican Smith</span>
      <span className='text-sm text-secondary-foreground/50'>Vietnam</span>
      <span className='text-sm text-secondary-foreground/50'>2023-08-25</span>
    </div>
    <div className='flex gap-2'>
      <span className='font-bold uppercase'>answer</span>
      <span>
        WeTrade is an established forex broker since 2015, with its headquarters
        in the United Kingdom.The platform is licensed by the Financial Conduct
        Authority (FCA) and the Labuan Financial Services Authority (Labuan
        FSA).WeTrade serves as an STP/ECN broker, providing multiple account
        types such as VIP Account, STP Account and ECN Account. With the
        platform, investors can trade forex, metals, energy, stocks, indices,
        and cryptocurrencies and employ strategies like hedging and scalping.On
        BrokersView, WeTrade scores 6.8 out of 10, with 24 reviews from its
        clients in total (as of Aug 24, 2023). With 24/7 customer support, it is
        convenient for traders to get the demanded information.
      </span>
    </div>
    <span className='text-sm text-blue-foreground'>See more</span>
  </div>
);

const BrokerQuestionsAndAnswersSection = ({ id }: { id: string }) => (
  <WhiteCard className='pt-10 '>
    <h2 className='text-2xl font-bold'>Related Complaints</h2>
    <Tabs defaultValue='Q&A' className='pt-5' dir='rtl' id={id}>
      <TabsList>
        <TabsTrigger
          className='bg-level1-foreground/30 data-[state=active]:bg-level1-foreground'
          value='Q&A'
        >
          Q&A
        </TabsTrigger>
      </TabsList>
      <TabsContent value='Q&A'>
        <QuesionPart />
      </TabsContent>
    </Tabs>
    <div className='mt-6 flex w-full items-center justify-center'>
      <button className='flex h-10 w-[180px] items-center justify-center border border-black/20 hover:border-level1-foreground hover:bg-level1-foreground'>
        See all
      </button>
    </div>
  </WhiteCard>
);

export default BrokerQuestionsAndAnswersSection;
