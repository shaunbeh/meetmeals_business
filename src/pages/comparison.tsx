import { Select } from '@/components/ui/select';
import endpoints from '@/lib/endpoints';
import {
  GetExchangesSymbolsResultApi,
  GetSymbolsExchangesResultApi,
} from '@/lib/schema/ApiTypes';
import { useQuery } from '@tanstack/react-query';
import texts from '@/lib/fa.json';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import LoadingSkeleton from '@/components/ui/Table/LoadingSkeleton';
import PairsTable from '@/components/ui/Table';
import CompareTableHeader from '@/components/pages/compare/CompareTableHeader';
import { CompareColumns } from '@/components/pages/compare/services/CompareColumns';
import { useState } from 'react';
import Link from 'next/link';

export default function Comparison() {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const {
    data: coinList,
    isLoading,
    refetch,
  } = useQuery<GetSymbolsExchangesResultApi>({
    queryKey: [
      endpoints.symbols.getSymbolsWithExchanges.url,
      {
        method: endpoints.symbols.getSymbolsWithExchanges.method,
      },
    ],
  });

  const coin = coinList?.data?.find((el) => el.symbol == selectedCoin);

  const handleCoinChange = (e: string) => {
    setSelectedCoin(e);
  };
  const refetchList = () => {
    refetch();
  };
  return (
    <MaxWidthWrapper className='mx-4 lg:mx-8 xl:px-32 py-10 gap-6 flex flex-col'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between items-center font-extrabold text-lg lg:text-2xl'>
          {texts.comparison.title}
        </div>
        <div className='flex items-center gap-2'>
          <Link
            className='bg-primary/50 text-black/70 hover:bg-primary hover:text-white text-white leading-8 font-bold px-3 py-1 rounded-lg'
            href='/'
          >
            {texts.links.homepage}
          </Link>
          <Link
            className='bg-primary/50 text-black/70 hover:bg-primary hover:text-white text-white leading-8 font-bold px-3 py-1 rounded-lg'
            href='/calculator'
          >
            {texts.links.calculator}
          </Link>
        </div>
      </div>
      <div className='p-6 bg-background rounded-lg'>
        <CompareTableHeader
          refetchList={refetchList}
          loading={isLoading}
          selectedCoin={selectedCoin}
          handleChange={handleCoinChange}
          coinList={coinList?.data}
        />
        {!coinList ? (
          <LoadingSkeleton />
        ) : (
          <>
            {coin?.exchanges && (
              <PairsTable columns={CompareColumns} data={coin.exchanges} />
            )}
          </>
        )}
        <div className='flex flex-col gap-2'>
          <h3 className='font-extrabold text-lg'>
            {texts.calculator.firstTitle}
          </h3>
          <p>{texts.calculator.firstDesc}</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
