import { GetSymbolsExchangesListResult } from '@/lib/schema/ApiTypes';
import { Button } from '../../ui/button';
import texts from 'public/locales/fa/fa.json';
import Image from 'next/image';
import PairsDropdown from '@/components/PairsDropdown';
import clsx from 'clsx';
import CountDown from '@/components/ui/CountDown';

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
  const foundSelected = coinList?.find((el) => el.symbol == selectedCoin);
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <div className='flex pb-6 gap-2'>
          <div className='w-12 h-12'>
            <Image
              src={foundSelected?.icon ?? ''}
              width={48}
              height={48}
              alt={foundSelected?.symbol + 'icon'}
              className='rounded-full'
            />
          </div>
          <div className='flex flex-col font-bold text-sm justify-center'>
            <span>{foundSelected?.name}</span>
            <span>{foundSelected?.symbol}</span>
          </div>
        </div>
        <div className='flex items-center text-muted-foreground gap-2'>
          {texts.comparison.updateIn}
          <CountDown interval={60} callback={refetchList} />
          {texts.comparison.secondsMore}
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4 items-center'>
        <div className='flex items-center overflow-x-auto custom-scroll-thin py-2 gap-4'>
          {coinList?.slice(0, 5).map((el) => (
            <Button
              key={el.symbol}
              variant='secondary'
              disabled={selectedCoin == el.symbol || loading}
              className={clsx(
                selectedCoin == el.symbol
                  ? 'bg-popover-foreground hover:bg-inherit hover:cursor-default text-popover'
                  : 'hover:bg-primary/30',
                'flex items-center gap-2 disabled:!opacity-100 rounded-3xl px-6 md:px-3 py-0.5'
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
        <div className='px-2 w-44 relative'>
          <PairsDropdown
            title={texts.comparison.MoreCoins}
            symbols={coinList?.slice(5)}
            value={
              coinList?.slice(5).find((el) => el.symbol == selectedCoin)
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
