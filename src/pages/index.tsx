import { useEffect, useMemo, useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PairsTable from '@/components/pairsTable';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WsMsgT } from '@/components/pairsTable/types';
import { useQuery } from '@tanstack/react-query';
import { SymbolsListResultApi } from '@/schema/ApiTypes';

export default function Home() {
  const [currPage, setCurrPage] = useState(1);

  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<WsMsgT>(wsUrl);

  const limit = 50;
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
            marketCap: '',
            name: row.name ?? '',
            price: (row.weekly_price?.[0].price ?? 0).toFixed(2),
            priceChange24h: '',
            priceChange7d: '',
            priceTmn: (
              (row.weekly_price?.[0].price ?? 0) * coinList.data.usdt_irt
            ).toFixed(2),
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
    if (readyState == ReadyState.OPEN && rows) {
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

  // 5
  // {
  //   "p3m": 44.229572597188,
  //   "p1y": 2.734976938119,
  //   "pytd": -1.229690729302,
  //   "pall": 267726.82831268857,
  //   "as": 151689320.42,
  //   "fmc24hpc": -2.237814274217
  // }

  //15
  // {
  //   "v": 106501203.68,
  //   "p1h": 0.04456655451,
  //   "d": 0.046,
  //   "vd": 0.091313
  // }
  useEffect(() => {
    const msg = lastJsonMessage?.d;
    if (rows && msg) {
      const row = rows.get(msg?.id);
      if (row) {
        rows.set(msg?.id, {
          ...row,
          volume: msg?.v?.toFixed(2) ?? row.volume,
          price: msg?.p?.toFixed(2),
          priceTmn: (msg?.p * row.usdtIrt).toFixed(2),
          priceChange24h: msg?.p24h?.toFixed(2),
          priceChange7d: msg?.p7d?.toFixed(2),
          marketCap: msg?.mc?.toFixed(2),
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

  const handleCurrPage = (p: number) => {
    setCurrPage(p);
  };
  return (
    <MaxWidthWrapper className=''>
      <PairsTable
        currPage={currPage}
        handleCurrPage={handleCurrPage}
        data={Array.from(rows.values())}
      />
    </MaxWidthWrapper>
  );
}

export const wsUrl = 'wss://push.coinmarketcap.com/ws';
