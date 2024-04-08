import endpoints from '@/lib/endpoints';
import { GetSymbolsExchangesResultApi } from '@/lib/schema/ApiTypes';
import { useQuery } from '@tanstack/react-query';
import texts from '@/lib/fa.json';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import LoadingSkeleton from '@/components/ui/Table/LoadingSkeleton';
import CompareTableHeader from '@/components/pages/compare/CompareTableHeader';
import { CompareColumns } from '@/components/pages/compare/services/CompareColumns';
import { useState } from 'react';
import Link from 'next/link';
import { fetchHeaderFooterData, fetchJson } from '@/lib/utils';
import Layout from '@/components/Layout';
import { ServerSideProps } from '@/types/commonTypes';
import BasicTable from '@/components/ui/Table';
import Faqs from '@/components/ui/Faq';

type PropsT = ServerSideProps;

export default function Comparison({ layoutProps, content, faqs }: PropsT) {
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
    <Layout {...layoutProps}>
      <MaxWidthWrapper>
        <div className='flex flex-col-reverse md:flex-row gap-6 justify-between items-center'>
          <div className='flex justify-between items-center font-extrabold md:text-lg lg:text-2xl'>
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
        <div className='p-2 md:p-6 bg-background rounded-lg'>
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
                <BasicTable columns={CompareColumns} data={coin.exchanges} />
              )}
            </>
          )}
          <div className='flex flex-col gap-2'>
            {/* {content && (
              <div
                className='prose max-w-none'
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )} */}
            {faqs && <Faqs data={faqs} />}
          </div>
        </div>
      </MaxWidthWrapper>
    </Layout>
  );
}

export async function getStaticProps() {
  const layoutProps = await fetchHeaderFooterData();
  const compData = await fetchJson(
    'https://clinicsarmayeh.com/wp-json/wp/v2/nodes?slug=node-compare'
  );

  const content = compData?.[0]?.content.rendered;
  const faqs = compData?.[0]?.faqs;

  return {
    props: {
      ...layoutProps,
      content,
      faqs,
    },
    revalidate: 3600,
  };
}
