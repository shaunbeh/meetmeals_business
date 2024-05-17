import clsx from 'clsx';
import Image from 'next/image';
import texts from 'public/locales/fa/fa.json';

import PairsDropdown from '@/components/PairsDropdown';
import CountDown from '@/components/ui/CountDown';
import type { GetSymbolsExchangesListResult } from '@/lib/schema/ApiTypes';

import { Button } from '../../ui/button';

export default function CompareTableHeader({
  coinList,
  refetchList,
  loading,
  selectedCoin,
  handleChange,
}: {
  coinList?: GetSymbolsExchangesListResult[];
  refetchList: () => void;
  loading: boolean;
  selectedCoin: string;
  handleChange: (coin: string) => void;
}) {
  const foundSelected = coinList?.find((el) => el.symbol === selectedCoin);
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 pb-6'>
          <div className='size-12'>
            <Image
              src={foundSelected?.icon ?? ''}
              width={48}
              height={48}
              alt={`${foundSelected?.symbol}icon`}
              className='rounded-full'
            />
          </div>
          <div className='flex flex-col justify-center text-sm font-bold'>
            <span>{foundSelected?.name}</span>
            <span>{foundSelected?.symbol}</span>
          </div>
        </div>
        <div className='flex items-center gap-2 text-muted-foreground'>
          {texts.comparison.updateIn}
          <CountDown interval={60} callback={refetchList} />
          {texts.comparison.secondsMore}
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 md:flex-row'>
        <div className='custom-scroll-thin flex items-center gap-4 overflow-x-auto py-2'>
          {coinList?.slice(0, 5).map((el) => (
            <Button
              key={el.symbol}
              variant='secondary'
              disabled={selectedCoin === el.symbol || loading}
              className={clsx(
                selectedCoin === el.symbol
                  ? 'bg-popover-foreground text-popover hover:cursor-default hover:bg-inherit'
                  : 'hover:bg-primary/30',
                'flex items-center gap-2 rounded-3xl px-6 py-0.5 disabled:!opacity-100 md:px-3',
              )}
              onClick={() => handleChange(el?.symbol ?? 'BTC')}
            >
              <Image
                src={el.icon ?? ''}
                width={24}
                height={24}
                alt={`${el.symbol} icon`}
              />
              {el.name}
            </Button>
          ))}
        </div>
        <div className='relative w-44 px-2'>
          <PairsDropdown
            title={texts.comparison.MoreCoins}
            symbols={coinList?.slice(5)}
            value={
              coinList?.slice(5).find((el) => el.symbol === selectedCoin)
                ? selectedCoin
                : ''
            }
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
