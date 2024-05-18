import Image from 'next/image';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

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
  const content = symbols?.map((el) => {
    if (el.symbol) {
      return (
        <SelectItem key={el.symbol} value={el.symbol}>
          <div className='flex items-center gap-2'>
            <Image
              src={el.icon ?? ''}
              alt={`${el.symbol} icon`}
              width={24}
              height={24}
              className='rounded-full'
            />
            <span className='mt-0.5 text-sm font-normal'>
              {el.symbol}
              {el?.name ? ` - ${el.name}` : ''}
            </span>
          </div>
        </SelectItem>
      );
    }
    return null;
  });

  return (
    <Select value={value} onValueChange={handleChange} dir='rtl'>
      <SelectTrigger className='w-full px-1'>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{content}</SelectGroup>
      </SelectContent>
    </Select>
  );
}
