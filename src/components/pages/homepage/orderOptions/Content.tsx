import clsx from 'clsx';
import NonVegetarianIcon from 'public/images/svg/non-vegetarian.svg';
import VegetarianIcon from 'public/images/svg/vegetarian.svg';

import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import type { GetPlansApiResponse } from '@/lib/types/ApiTypes';
import { cn } from '@/lib/utils';

const MealOptionsContent = ({
  data,
  selectedMealOption,
  setSelectedMealOption,
}: {
  data?: GetPlansApiResponse;
  selectedMealOption?: string;
  setSelectedMealOption: (option: string) => void;
}) =>
  data?.data.options.map((el, key) => {
    const selected = el.id.toString() === selectedMealOption;
    return (
      <button
        key={key}
        className={clsx(
          'flex items-center space-x-2 space-y-2 rounded-lg border p-3 hover:text-primary',
          selected
            ? 'border-primary text-primary'
            : 'border-line-primary text-text-primary',
        )}
        onClick={() => setSelectedMealOption(el?.id.toString())}
      >
        <Label
          htmlFor={el?.title.toString()}
          className='flex grow cursor-pointer items-center gap-4'
        >
          {el.title.toLowerCase().includes('non') ? (
            <NonVegetarianIcon className='size-12' />
          ) : (
            <VegetarianIcon className='size-12' />
          )}
          <Separator
            orientation='vertical'
            className={cn(selected ? 'bg-primary' : '', 'h-16')}
          />
          <div className='flex max-w-[calc(100%-100px)] flex-col gap-2'>
            <span className='text-start text-sub2-bold'>{el.title}</span>
            <span className='line-clamp-1 h-16 text-start text-sub3'>
              {el.description}
            </span>
          </div>
        </Label>
        <RadioGroupItem
          className='shrink-0'
          value={el.id.toString()}
          id={el.id.toString()}
        />
      </button>
    );
  });

export default MealOptionsContent;
