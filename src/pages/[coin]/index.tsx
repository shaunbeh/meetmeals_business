import TradingViewWidget from '@/components/TradingViewWidget';
import endpoints from '@/lib/endpoints';
import {
  GetExchangePricesResultApi,
  SymbolsListResultApi,
} from '@/lib/schema/ApiTypes';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Coin() {
  const router = useRouter();
  const { coin } = router.query;
  // const { data: exchangePrices } = useQuery<GetExchangePricesResultApi>({
  //   queryKey: [endpoints.exchanges.url, { method: endpoints.exchanges.method }],
  // });

  const { data: coinList } = useQuery<SymbolsListResultApi>({
    queryKey: [
      endpoints.symbols.url,
      { method: endpoints.symbols.method, filter: coin },
    ],
  });
  const found = coinList?.data?.records?.find((r) => r.symbol == coin);
  return (
    <div className='flex gap-8 w-full p-10 justify-around h-full'>
      <Link href='/'>Back</Link>
      <div className='h-96'>
        <TradingViewWidget symbol={found?.symbol} />
      </div>
      <p className='dir-rtl w-5/12 flex items-center'>
        {`${found?.name} با نماد اختصاری ${found?.symbol} یک ارز دیجیتال یا شکلی از دارایی دیجیتال
        است که با ارزش بازار حدود ۹۲۴.۷ میلیارد دلار، در رتبه ۱ بازار قرار داشته
        و دامیننس بیت کوین در حال حاضر ۵۱.۹۴ درصد است. هر واحد از بیت کوین در
        این لحظه با قیمت ۴۷,۱۲۱ دلار، با احتساب نرخ تتر ۵۴,۸۹۹ تومان معادل
        ۲,۵۸۶,۹۲۸,۶۶۷ تومان معامله می شود و حجم مبادلات روزانه آن ۳۴.۰۱ میلیارد
        دلار است. قیمت در ۲۴ ساعت اخیر ۱.۴۷% افزایش یافته است. بالاترین قیمت بیت
        کوین در تاریخ ۱۸ آبان ۱۴۰۰(09 November 2021) معادل ۶۷,۵۴۹.۷۳ دلار بوده
        که همینک %۳۰.۲۴ پایین‌تر از آن زمان قرار دارد. تعداد واحدهای در گردش بیت
        کوین ۱۹.۶۲ میلیون و ارزش بازار رقیق شده آن در حال حاضر
        ۹۸۹,۵۴۶,۶۳۸,۵۶۸.۷۰ دلار است.
        `}
      </p>
    </div>
  );
}
