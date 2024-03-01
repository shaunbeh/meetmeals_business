import { GetExchangesSymbolItemResult } from '@/lib/schema/ApiTypes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import Image from 'next/image';

type PropsT = {
  symbols: { symbol?: string; icon?: string; name?: string }[] | undefined;
  title: string;
  value: string;
  handleChange: (val: string) => void;
};
export default function PairsDropdown({
  symbols,
  title,
  value,
  handleChange,
}: PropsT) {
  return (
    <Select value={value} onValueChange={handleChange} dir='rtl'>
      <SelectTrigger className='w-full px-1'>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {symbols?.map((el) =>
            el.symbol ? (
              <SelectItem key={el.symbol} value={el.symbol}>
                <div className='flex items-center gap-2'>
                  <Image
                    src={el.icon ?? ''}
                    alt={el.symbol + ' icon'}
                    width={24}
                    height={24}
                    className='rounded-full'
                  />
                  <span className='text-sm font-normal mt-0.5'>
                    {el.symbol}
                    {el?.name ? ' - ' + el.name : ''}
                  </span>
                </div>
              </SelectItem>
            ) : null
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
