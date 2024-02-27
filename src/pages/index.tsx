import { useEffect, useMemo, useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PairsTable from '@/components/Table/PairsTable';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WsMsgT } from '@/components/Table/PairsTable/services/types';
import { useQuery } from '@tanstack/react-query';
import { SymbolsListResultApi } from '@/lib/schema/ApiTypes';
import { TablePagingation } from '@/components/Table/TablePagination';
import { TABLE_LIMIT, WS_URL } from '@/lib/config';
import TableHeader from '@/components/Table/TableHeader';
import endpoints from '@/lib/endpoints';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSkeleton from '@/components/Table/LoadingSkeleton';
import _ from 'lodash';
import useDebounce from '@/lib/hooks/useDebounce';

const limit = TABLE_LIMIT;

export default function Home() {
  const router = useRouter();

  const { searchText, debouncedText, setSearchText } = useDebounce('');
  const [currPage, setCurrPage] = useState(() => {
    const page = router.query.page;
    return page ? parseInt(page as string) : 1;
  });

  // useEffect(() => {
  //   const page = currPage.toString();
  //   router.push({ query: { page } }, undefined, { shallow: true });
  // }, [currPage, router]);

  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<WsMsgT>(WS_URL);

  const { data: coinList } = useQuery<SymbolsListResultApi>({
    queryKey: [
      endpoints.symbols.url,
      {
        method: endpoints.symbols.method,
        filter: debouncedText,
        limit,
        skip: limit * (currPage - 1),
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
            price: (row.weekly_price?.[0].price ?? 0).toLocaleString(),
            priceChange24h: '',
            priceChange7d: '',
            priceTmn: (
              ((row.weekly_price?.[0].price ?? 0) *
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
      <MaxWidthWrapper className='py-4'>
        <TableHeader search={searchText} setSearchText={setSearchText} />
        {!coinList ? (
          <LoadingSkeleton />
        ) : (
          <>
            <PairsTable data={Array.from(rows.values())} />
            <TablePagingation
              currPage={currPage}
              setCurrPage={setCurrPage}
              pageCount={pageCount}
            />
          </>
        )}
      </MaxWidthWrapper>
    </>
  );
}
