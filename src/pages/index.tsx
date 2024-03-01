import { useEffect, useMemo, useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PairsTable from '@/components/ui/Table';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WsMsgT } from '@/components/pages/homepage/services/types';
import { useQuery } from '@tanstack/react-query';
import { SymbolsListResultApi } from '@/lib/schema/ApiTypes';
import { TablePagingation } from '@/components/ui/Table/TablePagination';
import { TABLE_LIMIT, WS_URL } from '@/lib/config';
import HomepageTableHeader from '@/components/pages/homepage/HomepageTableHeader';
import endpoints from '@/lib/endpoints';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSkeleton from '@/components/ui/Table/LoadingSkeleton';
import _ from 'lodash';
import useDebounce from '@/lib/hooks/useDebounce';
import { pairsColumns } from '@/components/pages/homepage/services/HomeColumns';
import { usePathname, useSearchParams } from 'next/navigation';

const limit = TABLE_LIMIT;

export default function Home() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { searchText, debouncedText, setSearchText } = useDebounce('');
  const page = searchParams.get('page');
  const tag = searchParams.get('tag');
  const currPage = page ? +page : 1;

  const handleCurrPage = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('page', term);
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleSearchTag = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('tag', term);
    } else {
      params.delete('tag');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<WsMsgT>(WS_URL);

  const { data: coinList } = useQuery<SymbolsListResultApi>({
    queryKey: [
      endpoints.symbols.getSymbols.url,
      {
        method: endpoints.symbols.getSymbols.method,
        filter: debouncedText,
        limit,
        skip: limit * (currPage - 1),
        tag,
      },
    ],
  });
  const rows = useMemo(
    () =>
      new Map(
        coinList?.data?.records?.map((row) => [
          row.id,
          {
            icon: row.icon ?? '',
            id: row.id ?? 0,
            idx: row.row_num,
            marketCap: '',
            name: row.name ?? '',
            price: (row.weekly_price?.[0]?.price ?? 0).toLocaleString(),
            priceChange24h: '',
            priceChange7d: '',
            priceTmn: (
              ((row.weekly_price?.[0]?.price ?? 0) *
                (coinList?.data?.usdt_irt ?? 1)) /
              10
            ).toLocaleString(),
            symbol: row.symbol ?? '',
            volume: '',
            usdtIrt: coinList?.data?.usdt_irt,
            last7: row.weekly_price,
          },
        ])
      ),
    [coinList]
  );

  useEffect(() => {
    if (readyState == ReadyState.OPEN && rows.size) {
      const pairs = Array.from(rows.keys()).join(',');
      const subDataFive = {
        method: 'RSUBSCRIPTION',
        params: ['main-site@crypto_price_5s@{}@normal', pairs],
      };
      const subDataFifteen = {
        method: 'RSUBSCRIPTION',
        params: ['main-site@crypto_price_15s@{}@normal', pairs],
      };
      sendJsonMessage(subDataFive);
      sendJsonMessage(subDataFifteen);
    }
  }, [readyState, sendJsonMessage, rows]);

  useEffect(() => {
    const msg = lastJsonMessage?.d;
    if (rows && msg) {
      const row = rows.get(msg?.id);
      if (row) {
        rows.set(msg?.id, {
          ...row,
          volume: msg?.v?.toLocaleString() ?? row.volume,
          price: msg?.p?.toLocaleString(),
          priceTmn: ((msg?.p * (row?.usdtIrt ?? 1)) / 10).toLocaleString(),
          priceChange24h: msg?.p24h?.toLocaleString(),
          priceChange7d: msg?.p7d?.toLocaleString(),
          marketCap: msg?.mc?.toLocaleString(),
        });
      }
    }
  }, [lastJsonMessage, rows]);

  const pageCount = coinList?.data?.page_count ?? 1;

  return (
    <>
      <Head>
        {currPage !== 1 && <link rel='prev' href={`/?page=${currPage - 1}`} />}
        {currPage !== pageCount && (
          <link rel='next' href={`/?page=${currPage + 1}`} />
        )}
      </Head>
      <MaxWidthWrapper className='mt-10 grow w-full px-32'>
        <HomepageTableHeader
          tag={tag}
          search={searchText}
          setSearchText={setSearchText}
          handleSearchTag={handleSearchTag}
        />
        {!coinList ? (
          <LoadingSkeleton />
        ) : (
          <>
            <PairsTable
              columns={pairsColumns}
              data={Array.from(rows.values())}
            />
            <TablePagingation
              currPage={currPage}
              handleCurrPage={handleCurrPage}
              pageCount={pageCount}
            />
          </>
        )}
      </MaxWidthWrapper>
    </>
  );
}
