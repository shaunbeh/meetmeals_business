import BasicTable from '@/components/ui/Table';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WsMsgT } from './services/types';
import { WS_URL } from '@/lib/config';
import { useEffect, useMemo } from 'react';
import { SymbolsListResultApi } from '@/lib/schema/ApiTypes';
import { pairsColumns } from './services/HomeColumns';

type PropsT = { coinList: SymbolsListResultApi | undefined };
export default function PairsTable({ coinList }: PropsT) {
  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<WsMsgT>(WS_URL);

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

  return (
    <>
      <BasicTable columns={pairsColumns} data={Array.from(rows.values())} />
    </>
  );
}
