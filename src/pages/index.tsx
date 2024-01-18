import { useEffect, useMemo, useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PairsTable from '@/components/PairsTable';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WsMsgT } from '@/components/PairsTable/services/types';
import { useQuery } from '@tanstack/react-query';
import { SymbolsListResultApi } from '@/utils/schema/ApiTypes';
import { TablePagingation } from '@/components/TablePagination';
import { TABLE_LIMIT, WS_URL } from '@/utils/config';

const limit = TABLE_LIMIT;

export default function Home() {
  const [currPage, setCurrPage] = useState(1);

  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<WsMsgT>(WS_URL);

  const { data: coinList } = useQuery<SymbolsListResultApi>({
    queryKey: [
      '/v1/get-symbols',
      { method: 'post', limit, skip: limit * (currPage - 1) },
    ],
  });

  const rows = useMemo(
    () =>
      new Map(
        coinList?.data.records.map((row) => [
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
              ((row.weekly_price?.[0].price ?? 0) * coinList?.data?.usdt_irt) /
              10
            ).toLocaleString(),
            symbol: row.symbol ?? '',
            volume: '',
            usdtIrt: coinList.data.usdt_irt,
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
          priceTmn: ((msg?.p * row?.usdtIrt) / 10).toLocaleString(),
          priceChange24h: msg?.p24h?.toLocaleString(),
          priceChange7d: msg?.p7d?.toLocaleString(),
          marketCap: msg?.mc?.toLocaleString(),
        });
      }
    }
  }, [lastJsonMessage, rows]);

  if (!coinList)
    return (
      <div className='absolute inset-0 flex items-center justify-center z-50 bg-black/10'>
        Loading...
      </div>
    );

  const pageCount = coinList.data.page_count;

  return (
    <MaxWidthWrapper className=''>
      <PairsTable data={Array.from(rows.values())} />
      <TablePagingation
        currPage={currPage}
        setCurrPage={setCurrPage}
        pageCount={pageCount}
      />
    </MaxWidthWrapper>
  );
}
