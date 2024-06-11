import CheckIcon from 'public/images/svg/check.svg';
import CloseIcon from 'public/images/svg/close.svg';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

import WhiteCard from '../WhiteCard';

const fakeData: FakeData = {
  min_Deposit: '10.0 USD',
  max_Leverage: '1 : 1000',
  min_Trade_Volume: '0.01 Lots',
  margin_Call_Level: '50%',
  stop_Out_Level: '30%',
  commission: '0 USD',
  spread_Type: 'Variable Spread',
  account_Currencies: 'EUR, USD',
  trading_Instruments:
    'Cryptocurrencies, Stocks/Equities, CFDs, Indices, Commodities, Forex/Currencies',
  EA: true,
  hedging: true,
  scalping: false,
  NBP: true,
  islamic: false,
};
const fakeData2: FakeData = {
  min_Deposit: '10.0 USD',
  max_Leverage: '1 : 1000',
  min_Trade_Volume: '0.01 Lots',
  margin_Call_Level: '50%',
  stop_Out_Level: '30%',
  commission: '0 USD',
  spread_Type: 'Variable Spread',
  account_Currencies: 'EUR, USD',
  trading_Instruments:
    'Cryptocurrencies, Stocks/Equities, CFDs, Indices, Commodities, Forex/Currencies',
  EA: true,
  hedging: true,
  scalping: true,
  NBP: true,
  islamic: true,
};
const fakeData3: FakeData = {
  min_Deposit: '10.0 USD',
  max_Leverage: '1 : 1000',
  min_Trade_Volume: '0.01 Lots',
  margin_Call_Level: '50%',
  stop_Out_Level: '30%',
  commission: '0 USD',
  spread_Type: 'Variable Spread',
  account_Currencies: 'EUR, USD',
  trading_Instruments:
    'Cryptocurrencies, Stocks/Equities, CFDs, Indices, Commodities, Forex/Currencies',
  EA: false,
  hedging: false,
  scalping: false,
  NBP: true,
  islamic: false,
};

const TabsCustomContent = ({ data }: { data: FakeData }) => (
  <div className='flex flex-col gap-4 pt-5'>
    {Object.entries(data).map(([key, value]) => {
      const isBool = typeof value === 'boolean';
      return (
        <div className='flex items-center gap-10' key={key}>
          <span className='w-[200px] text-sm capitalize'>
            {key.replace(/_/g, ' ')}
          </span>
          <span className='text-sm font-bold capitalize'>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isBool ? (
              value ? (
                <CheckIcon className='size-5 text-primary' />
              ) : (
                <CloseIcon className='size-5 text-error' />
              )
            ) : (
              value
            )}
          </span>
        </div>
      );
    })}
  </div>
);

const BrokerAcountTypeSection = ({ id }: { id: string }) => (
  <WhiteCard className='pt-10'>
    <div className='mb-2 flex items-center justify-between'>
      <h2 className='text-2xl font-bold'>نوع اکانت</h2>
      <button className='w-[150px] border border-level1-foreground bg-level1-foreground p-2 text-sm font-bold text-black'>
        مقایسه
      </button>
    </div>
    <div className='flex items-center gap-2' id={id}>
      <span className='text-4xl font-bold'>8</span>
      <span className='text-sm font-bold'>score</span>
    </div>
    <Tabs defaultValue='Cashback' className='pt-5' dir='rtl'>
      <TabsList>
        <TabsTrigger
          className='bg-level1-foreground/30 data-[state=active]:bg-level1-foreground'
          value='Cashback'
        >
          Cashback Margin (FXC Trader)
        </TabsTrigger>
        <TabsTrigger
          className='bg-level1-foreground/30 data-[state=active]:bg-level1-foreground'
          value='Floating'
        >
          Floating (FXC Trader)
        </TabsTrigger>
        <TabsTrigger
          className='bg-level1-foreground/30 data-[state=active]:bg-level1-foreground'
          value='PRO'
        >
          PRO TRADING SCALPING MARGIN
        </TabsTrigger>
      </TabsList>
      <TabsContent value='Cashback'>
        <TabsCustomContent data={fakeData} />
      </TabsContent>
      <TabsContent value='Floating'>
        <TabsCustomContent data={fakeData2} />
      </TabsContent>
      <TabsContent value='PRO'>
        <TabsCustomContent data={fakeData3} />
      </TabsContent>
    </Tabs>
  </WhiteCard>
);

export default BrokerAcountTypeSection;

interface TradingFeatures {
  EA: boolean;
  hedging: boolean;
  scalping: boolean;
  NBP: boolean;
  islamic: boolean;
}

interface AccountDetails {
  min_Deposit: string;
  max_Leverage: string;
  min_Trade_Volume: string;
  margin_Call_Level: string;
  stop_Out_Level: string;
  commission: string;
  spread_Type: string;
  account_Currencies: string;
  trading_Instruments: string;
}

interface FakeData extends TradingFeatures, AccountDetails {}
