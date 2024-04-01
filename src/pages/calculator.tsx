import PairsDropdown from '@/components/PairsDropdown';
import { Input } from '@/components/ui/input';
import ChangeIcon from 'public/images/svg/change.svg';
import texts from '@/lib/fa.json';
import { ArrowLeft2 } from 'iconsax-react';
import endpoints from '@/lib/endpoints';
import { useQuery } from '@tanstack/react-query';
import {
  GetCalculatorApi,
  GetExchangesSymbolItemResult,
  GetExchangesSymbolsResultApi,
} from '@/lib/schema/ApiTypes';
import { ChangeEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { roundDecimalDigits } from '@/lib/utils';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { google } from 'googleapis';
import {
  generateHtmlContentFromSheetData,
  getGoogleSheetsData,
} from '@/utils/gsheets';

export default function Calculator({ htmlTags }: { htmlTags: string }) {
  const [firstSymbol, setFirstSymbol] = useState('btc');
  const [firstSymbolCount, setFirstSymbolCount] = useState<string | number>(1);
  const [secondSymbol, setSecondSymbol] = useState('');
  const [secondSymbolCount, setSecondSymbolCount] = useState<string | number>(
    ''
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

  const IrtPair = useMemo(
    () => ({
      ask_price: 10,
      bid_price: 10,
      symbol: 'IRT',
      pair: 'IRT',
      name: 'تومان',
      icon: '/images/svg/irt.svg',
    }),
    []
  );

  const firstPair = exchangeData?.data?.find(
    (el) => el.symbol?.toLowerCase() == firstSymbol
  );
  console.log(firstPair);
  const secondPair =
    secondSymbol == 'IRT'
      ? IrtPair
      : exchangeData?.data?.find(
          (el) => el.symbol?.toLowerCase() == secondSymbol
        );

  const handleFirstPairChange = (val: string) => {
    setFirstSymbol(val);
    const first = exchangeData?.data?.find((el) => el.symbol == val);
    if (secondPair && first && firstSymbolCount) {
      setSecondSymbolCount(
        +firstSymbolCount * (first.bid_price / secondPair.bid_price)
      );
    }
  };

  const handleSecondPairChange = (val: string) => {
    const second = exchangeData?.data?.[0]?.symbols?.find(
      (el) => el.symbol == val
    );
    if (second && firstPair && +firstSymbolCount) {
      setSecondSymbolCount(
        +firstSymbolCount * (firstPair.bid_price / second.bid_price)
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
      {
        setSecondSymbolCount(
          roundDecimalDigits(
            +e.target.value * (firstPair?.bid_price / secondPair?.bid_price),
            4
          )
        );
      }
    }
  };

  const handleSecondSymbolCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!+e.target.value) return;
    setSecondSymbolCount(e.target.value);
    if (firstPair?.bid_price && secondPair?.bid_price) {
      {
        setFirstSymbolCount(
          roundDecimalDigits(
            +e.target.value * (secondPair?.bid_price / firstPair?.bid_price),
            4
          )
        );
      }
    }
  };

  const firstSelectBoxSymbols = useMemo(() => {
    const syms = exchangeData?.data?.[0]?.symbols;
    if (!syms) return;
    return syms.filter((el) =>
      secondSymbol ? el.symbol !== secondSymbol : true
    );
  }, [exchangeData?.data, secondSymbol]);

  const secondSelecBoxSymbols = useMemo(() => {
    let syms = exchangeData?.data?.[0]?.symbols;
    if (!syms) return;
    syms = [IrtPair, ...syms];
    return syms.filter((el) =>
      firstSymbol ? el.symbol !== firstSymbol : true
    );
  }, [exchangeData?.data, firstSymbol, IrtPair]);

  return (
    <MaxWidthWrapper className='mx-8 lg:px-32 py-10 gap-6 flex flex-col'>
      <div className='flex items-center justify-end gap-2'>
        <Link
          className='bg-primary/50 text-black/70 hover:bg-primary hover:text-white text-white leading-8 font-bold px-3 py-1 rounded-lg'
          href='/'
        >
          {texts.links.homepage}
        </Link>
        <Link
          className='bg-primary/50 text-black/70 hover:bg-primary hover:text-white text-white leading-8 font-bold px-3 py-1 rounded-lg'
          href='/comparison'
        >
          {texts.links.comparison}
        </Link>
      </div>
      <div className='flex flex-col gap-8 px-4 lg:px-10 w-full lg:max-w-lg mx-auto bg-destructive-foreground py-8 rounded-lg'>
        <h1 className='flex justify-between items-center font-extrabold text-lg lg:text-2xl'>
          {texts.calculator.name}
        </h1>
        <div className='flex items-center justify-center gap-6'>
          <PairsDropdown
            title={texts.calculator.basePairTitle}
            symbols={firstSelectBoxSymbols}
            value={firstSymbol}
            handleChange={handleFirstPairChange}
          />
          <div>
            <ChangeIcon className='w-6 h-6' />
          </div>
          <PairsDropdown
            title={texts.calculator.targetPairTitle}
            symbols={secondSelecBoxSymbols}
            value={secondSymbol}
            handleChange={handleSecondPairChange}
          />
        </div>
        <div className='flex justify-center items-center gap-6'>
          <Input
            className='text-center'
            onChange={handleFirstSymbolCountChange}
            inputMode='decimal'
            value={firstSymbolCount.toLocaleString()}
          />
          <span>=</span>
          <Input
            className='text-center'
            onChange={handleSecondSymbolCountChange}
            inputMode='decimal'
            value={secondSymbolCount.toLocaleString()}
          />
        </div>
        <h1>hi</h1>
        {firstSymbolCount && firstPair?.bid_price && secondPair?.bid_price && (
          <div className='flex items-center text-muted-foreground mx-auto gap-2 dir-rtl'>
            {texts.calculator.each}
            <span className='text-black'>{firstSymbolCount}</span>
            <span className='text-black'>{firstPair.symbol}</span>
            {texts.calculator.equalsTo}
            <span className='text-black'>
              {roundDecimalDigits(
                +firstSymbolCount *
                  (firstPair?.bid_price / secondPair?.bid_price),
                4
              ).toLocaleString()}
            </span>
            <span className='text-black'>
              {secondPair.name ? secondPair.name : secondPair.symbol}
            </span>
          </div>
        )}
        {firstPair && (
          <Link
            href={`/coins/${firstPair?.symbol}`}
            className='flex gap-2 px-3 py-2 rounded-lg bg-popover items-center justify-between'
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
              <ArrowLeft2 className='w-4 h-4' />
            </div>
          </Link>
        )}
        {secondPair && secondPair.symbol !== 'IRT' && (
          <Link
            href={`/coins/${secondPair?.symbol}`}
            className='flex gap-2 px-3 py-2 rounded-lg bg-popover items-center justify-between'
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
              <ArrowLeft2 className='w-4 h-4' />
            </div>
          </Link>
        )}
      </div>
      <div className='flex flex-col gap-6'>
        <h3>{texts.calculator.commonConverts}</h3>
        <div className='flex items-center gap-4 text-foreground w-full overflow-x-auto pb-2 custom-scroll'>
          {exchangeData?.data?.[0]?.symbols?.map((el) => (
            <button
              key={el.symbol}
              className='flex flex-col items-center gap-2 bg-destructive-foreground py-3 px-2 rounded-lg '
              onClick={() => handleClickCommon(el)}
            >
              <div className='flex items-center text-primary'>
                <Image
                  src='/images/svg/irt.svg'
                  width={24}
                  height={24}
                  alt={`${el.symbol} icon`}
                  className='-me-2 rounded-full z-[1]'
                />
                <Image
                  src={el?.icon ?? ''}
                  width={24}
                  height={24}
                  alt={`${el.symbol} icon`}
                  className='rounded-full'
                />
              </div>
              <span className='text-sm font-medium'>{el.symbol}/IRT ‌</span>
            </button>
          ))}
        </div>
      </div>
      {/* <div className='flex flex-col gap-2'>{htmlTags}</div> */}
      <div
        className='prose max-w-none'
        dangerouslySetInnerHTML={{ __html: htmlTags }}
      />
    </MaxWidthWrapper>
  );
}

export async function getStaticProps() {
  const htmlTags = await getGoogleSheetsData('A2:C');
  return {
    props: {
      htmlTags,
    },
    revalidate: 60,
  };
}
