import { useQuery } from '@tanstack/react-query';
import { ArrowLeft2 } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import ChangeIcon from 'public/images/svg/change.svg';
import texts from 'public/locales/fa/fa.json';
import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

import Layout from '@/components/Layout';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PairsDropdown from '@/components/PairsDropdown';
import Faqs from '@/components/ui/Faq';
import { Input } from '@/components/ui/input';
import endpoints from '@/lib/endpoints';
import type {
  GetCalculatorApi,
  GetExchangesSymbolItemResult,
} from '@/lib/schema/ApiTypes';
import { fetchJson, roundDecimalDigits } from '@/lib/utils';
import type { ServerSideProps } from '@/types/commonTypes';

type PropsT = ServerSideProps;

const IrtPair = {
  name: 'تومان',
  symbol: 'IRT',
  icon: '/images/svg/irt.svg',
  pair: 'IRT',
  bid_price: 10,
  ask_price: 10,
};

export default function Calculator({ content, faqs }: PropsT) {
  const [firstSymbol, setFirstSymbol] = useState('BTC');
  const [firstSymbolCount, setFirstSymbolCount] = useState<string | number>(1);
  const [secondSymbol, setSecondSymbol] = useState('IRT');
  const [secondSymbolCount, setSecondSymbolCount] = useState<string | number>(
    '',
  );

  const { data: exchangeData } = useQuery<GetCalculatorApi>({
    queryKey: [
      endpoints.calculator.url,
      {
        method: endpoints.calculator.method,
        exchange_id: 1,
      },
    ],
  });

  const firstPair = exchangeData?.data?.find((el) => el.symbol === firstSymbol);

  const secondPair =
    secondSymbol === 'IRT'
      ? IrtPair
      : exchangeData?.data?.find((el) => el.symbol === secondSymbol);

  const handleFirstPairChange = (val: string) => {
    setFirstSymbol(val);
    const first = exchangeData?.data?.find((el) => el.symbol === val);
    if (secondPair?.bid_price && first?.bid_price && firstSymbolCount) {
      setSecondSymbolCount(
        +firstSymbolCount * (first.bid_price / secondPair.bid_price),
      );
    }
  };

  const handleSecondPairChange = (val: string) => {
    const second = exchangeData?.data?.find((el) => el.symbol === val);
    if (second?.bid_price && firstPair?.bid_price && +firstSymbolCount) {
      setSecondSymbolCount(
        +firstSymbolCount * (firstPair.bid_price / second.bid_price),
      );
    }
    setSecondSymbol(val);
  };

  const handleClickCommon = (coin: GetExchangesSymbolItemResult) => {
    if (coin.bid_price && coin.symbol) {
      setFirstSymbol(coin.symbol);
      setFirstSymbolCount(1);
      setSecondSymbol('IRT');
      setSecondSymbolCount(coin.bid_price);
    }
  };

  const handleFirstSymbolCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!+e.target.value) return;
    setFirstSymbolCount(e.target.value);
    if (firstPair?.bid_price && secondPair?.bid_price) {
      setSecondSymbolCount(
        roundDecimalDigits(
          +e.target.value * (firstPair.bid_price / secondPair.bid_price),
          4,
        ),
      );
    }
  };

  const handleSecondSymbolCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!+e.target.value) return;
    setSecondSymbolCount(e.target.value);
    if (firstPair?.bid_price && secondPair?.bid_price) {
      setFirstSymbolCount(
        roundDecimalDigits(
          +e.target.value * (secondPair.bid_price / firstPair.bid_price),
          4,
        ),
      );
    }
  };

  const firstSelectBoxSymbols = useMemo(() => {
    const syms = exchangeData?.data;
    if (!syms) return [];
    return syms.filter((el) =>
      secondSymbol ? el.symbol !== secondSymbol : true,
    );
  }, [exchangeData?.data, secondSymbol]);

  const secondSelecBoxSymbols = useMemo(() => {
    let syms = exchangeData?.data;
    if (!syms) return [];
    syms = [IrtPair, ...syms];
    return syms.filter((el) =>
      firstSymbol ? el.symbol !== firstSymbol : true,
    );
  }, [exchangeData?.data, firstSymbol]);

  useEffect(() => {
    if (firstPair?.bid_price && IrtPair?.bid_price) {
      setSecondSymbolCount(firstPair.bid_price / IrtPair.bid_price);
    }
  }, [exchangeData, firstPair?.bid_price]);

  return (
    <Layout>
      <MaxWidthWrapper>
        <div className='flex flex-col-reverse items-center justify-between gap-6 md:flex-row'>
          <div className='flex items-center justify-between font-extrabold md:text-lg lg:text-2xl'>
            {texts.calculator.title}
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
              href='/comparison'
            >
              {texts.links.comparison}
            </Link>
          </div>
        </div>
        <div className='mx-auto flex w-full flex-col gap-8 rounded-lg bg-destructive-foreground px-4 py-8 lg:max-w-lg lg:px-10'>
          <div className='flex items-center justify-center gap-6'>
            <PairsDropdown
              title={texts.calculator.basePairTitle}
              symbols={firstSelectBoxSymbols}
              value={firstSymbol}
              handleChange={handleFirstPairChange}
            />
            <div>
              <ChangeIcon className='size-6' />
            </div>
            <PairsDropdown
              title={texts.calculator.targetPairTitle}
              symbols={secondSelecBoxSymbols}
              value={secondSymbol}
              handleChange={handleSecondPairChange}
            />
          </div>
          <div className='flex items-center justify-center gap-6'>
            <Input
              className='text-center'
              onChange={handleFirstSymbolCountChange}
              inputMode='decimal'
              value={firstSymbolCount.toLocaleString()}
            />
            <span> =</span>
            <Input
              className='text-center'
              onChange={handleSecondSymbolCountChange}
              inputMode='decimal'
              value={secondSymbolCount.toLocaleString()}
            />
          </div>
          {firstSymbolCount &&
            firstPair?.bid_price &&
            secondPair?.bid_price && (
              <div className='dir-rtl mx-auto flex items-center gap-2 text-muted-foreground'>
                {texts.calculator.each}
                <span className='text-black'>{firstSymbolCount}</span>
                <span className='text-black'>{firstPair.symbol}</span>
                {texts.calculator.equalsTo}
                <span className='text-black'>
                  {firstPair?.bid_price && secondPair?.bid_price
                    ? roundDecimalDigits(
                        +firstSymbolCount *
                          (firstPair.bid_price / secondPair.bid_price),
                        4,
                      ).toLocaleString()
                    : 'N/A'}
                </span>
                <span className='text-black'>
                  {secondPair.name ? secondPair.name : secondPair.symbol}
                </span>
              </div>
            )}
          {firstPair && (
            <Link
              href={`/coins/${firstPair?.symbol}`}
              className='flex items-center justify-between gap-2 rounded-lg bg-popover px-3 py-2'
            >
              <div className='flex items-center gap-2'>
                <Image
                  src={firstPair.icon ?? ''}
                  width={24}
                  className='rounded-full'
                  height={24}
                  alt={`${firstPair.symbol} icon`}
                />
                <span className='mt-0.5 font-medium'>{firstPair.symbol}</span>
              </div>
              <div className='flex items-center gap-2'>
                {texts.calculator.ViewCoin}
                <ArrowLeft2 className='size-4' />
              </div>
            </Link>
          )}
          {secondPair && secondPair.symbol !== 'IRT' && (
            <Link
              href={`/coins/${secondPair?.symbol}`}
              className='flex items-center justify-between gap-2 rounded-lg bg-popover px-3 py-2'
            >
              <div className='flex items-center gap-2'>
                <Image
                  src={secondPair.icon ?? ''}
                  className='rounded-full'
                  width={24}
                  height={24}
                  alt={`${secondPair.symbol} icon`}
                />
                <span className='mt-0.5 font-medium'>{secondPair.symbol}</span>
              </div>
              <div className='flex items-center gap-2'>
                {texts.calculator.ViewCoin}
                <ArrowLeft2 className='size-4' />
              </div>
            </Link>
          )}
        </div>
        <div className='flex flex-col gap-6'>
          <h3>{texts.calculator.commonConverts}</h3>
          <div className='custom-scroll flex w-full items-center gap-4 overflow-x-auto pb-2 text-foreground'>
            {exchangeData?.data?.map((el) => (
              <button
                type='button'
                key={el.symbol}
                className='flex flex-col items-center gap-2 rounded-lg bg-destructive-foreground px-2 py-3 '
                onClick={() => handleClickCommon(el)}
              >
                <div className='flex items-center text-primary'>
                  <Image
                    src='/images/svg/irt.svg'
                    width={24}
                    height={24}
                    alt={`${el.symbol} icon`}
                    className='z-[1] -me-2 rounded-full'
                  />
                  <Image
                    src={el?.icon ?? ''}
                    width={24}
                    height={24}
                    alt={`${el.symbol} icon`}
                    className='rounded-full'
                  />
                </div>
                <span className='text-sm font-medium'>
                  {el.symbol}
                  /IRT
                </span>
              </button>
            ))}
          </div>
        </div>
        {content && (
          <div
            className='prose max-w-none'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        {faqs && <Faqs data={faqs} />}
      </MaxWidthWrapper>
    </Layout>
  );
}

export async function getStaticProps() {
  const calcData = await fetchJson(
    'https://clinicsarmayeh.com/wp-json/wp/v2/nodes?slug=node-calculator',
  );
  const content = calcData?.[0]?.content.rendered;
  const faqs = calcData?.[0]?.faqs;

  return {
    props: {
      content,
      faqs,
    },
    revalidate: 3600,
  };
}
