import { useState, useEffect } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PairsTable from '@/components/pairsTable';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import initialData from '@/components/pairsTable/data.json';
import { WsMsgT } from '@/components/pairsTable/types';

export default function Home() {
  const [data, setData] = useState(initialData.pairs);
  const { sendJsonMessage, readyState, lastJsonMessage } =
    useWebSocket<WsMsgT>(wsUrl);

  useEffect(() => {
    if (readyState == ReadyState.OPEN) {
      sendJsonMessage(subData);
    }
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    const msg = lastJsonMessage?.d;
    setData((data) =>
      data.map((prev) => {
        const icon =
          'https://coinicons-api.vercel.app/api/icon/' +
          prev.symbol.toLowerCase();

        if (prev.id == msg?.id) {
          return {
            ...prev,
            id: prev.id,
            icon,
            price: msg.p.toFixed(2),
            priceTmn: (msg.p * 51000).toFixed(2),
            volume: '',
            priceChange24h: msg.p24h.toFixed(2),
            priceChange7d: msg.p7d.toFixed(2),
            marketCap: msg.mc.toFixed(2),
          };
        } else return { ...prev, icon };
      })
    );
  }, [lastJsonMessage]);

  return (
    <MaxWidthWrapper>
      <PairsTable data={data} />
    </MaxWidthWrapper>
  );
}

export const wsUrl = 'wss://push.coinmarketcap.com/ws';

export const subData = {
  method: 'RSUBSCRIPTION',
  params: [
    'main-site@crypto_price_5s@{}@normal',
    initialData.pairs.map((p) => p.id).join(','),
  ],
};
