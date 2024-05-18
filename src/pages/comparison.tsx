import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import texts from 'public/locales/fa/fa.json';
import { useState } from 'react';

import Layout from '@/components/Layout';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import CompareTableHeader from '@/components/pages/compare/CompareTableHeader';
import { CompareColumns } from '@/components/pages/compare/services/CompareColumns';
import Faqs from '@/components/ui/Faq';
import BasicTable from '@/components/ui/Table';
import LoadingSkeleton from '@/components/ui/Table/LoadingSkeleton';
import endpoints from '@/lib/endpoints';
import type { GetSymbolsExchangesResultApi } from '@/lib/schema/ApiTypes';
import { fetchJson } from '@/lib/utils';
import type { ServerSideProps } from '@/types/commonTypes';

type PropsT = ServerSideProps;

export default function Comparison({ content, faqs }: PropsT) {
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

  const coin = coinList?.data?.find((el) => el.symbol === selectedCoin);

  const handleCoinChange = (e: string) => {
    setSelectedCoin(e);
  };
  const refetchList = () => {
    refetch();
  };
  return (
    <Layout>
      <MaxWidthWrapper>
        <div className='flex flex-col-reverse items-center justify-between gap-6 md:flex-row'>
          <div className='flex items-center justify-between font-extrabold md:text-lg lg:text-2xl'>
            {texts.comparison.title}
          </div>
          <div className='flex items-center gap-2'>
            <Link
              className='rounded-lg bg-primary/50 px-3 py-1 font-bold leading-8 text-black/70 hover:bg-primary hover:text-white'
              href='/'
            >
              {texts.links.homepage}
            </Link>
            <Link
              className='rounded-lg bg-primary/50 px-3 py-1 font-bold leading-8 text-black/70 hover:bg-primary hover:text-white'
              href='/calculator'
            >
              {texts.links.calculator}
            </Link>
          </div>
        </div>
        <div className='rounded-lg bg-background p-2 md:p-6'>
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
            coin?.exchanges && (
              <BasicTable columns={CompareColumns} data={coin.exchanges} />
            )
          )}
          <div className='flex flex-col gap-2'>
            {content && (
              <div
                className='prose max-w-none'
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            {faqs && <Faqs data={faqs} />}
          </div>
        </div>
      </MaxWidthWrapper>
    </Layout>
  );
}

export async function getStaticProps() {
  const compData = await fetchJson(
    'https://clinicsarmayeh.com/wp-json/wp/v2/nodes?slug=node-compare',
  );

  const content = compData?.[0]?.content.rendered;
  const faqs = compData?.[0]?.faqs;

  return {
    props: {
      content,
      faqs,
    },
    revalidate: 3600,
  };
}
