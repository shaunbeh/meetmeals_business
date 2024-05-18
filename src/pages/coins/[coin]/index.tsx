import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import texts from 'public/locales/fa/fa.json';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import TradingViewWidget from '@/components/TradingViewWidget';
import endpoints from '@/lib/endpoints';
import type { SymbolsListResultApi } from '@/lib/schema/ApiTypes';

export default function Coin() {
  const router = useRouter();
  const { coin } = router.query;

  // const { data: exchangePrices } = useQuery<GetExchangePricesResultApi>({
  //   queryKey: [endpoints.exchanges.url, { method: endpoints.exchanges.method }],
  // });

  const { data: coinList } = useQuery<SymbolsListResultApi>({
    queryKey: [
      endpoints.symbols.getSymbols.url,
      { method: endpoints.symbols.getSymbols.method, filter: coin },
    ],
  });
  const found = coinList?.data?.records?.find((r) => r.symbol === coin);
  return (
    <MaxWidthWrapper className='flex size-full flex-col justify-around gap-8 p-10'>
      <div className='flex items-center justify-end'>
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
          <Link
            className='rounded-lg bg-primary/50 px-3 py-1 font-bold leading-8 text-black/70 hover:bg-primary hover:text-white'
            href='/comparison'
          >
            {texts.links.comparison}
          </Link>
        </div>
      </div>
      <div className='flex flex-1'>
        <p className='flex w-min grow items-center'>
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
        <div className='mb-8 h-96 grow'>
          <TradingViewWidget symbol={found?.symbol} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
// export async function getStaticProps() {
//   const layoutProps = await fetchHeaderFooterData();

//   return {
//     revalidate: 3600,
//     props: { ...layoutProps },
//   };
// }
