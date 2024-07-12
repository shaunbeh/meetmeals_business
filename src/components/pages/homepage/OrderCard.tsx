import clsx from 'clsx';
import { Clock } from 'iconsax-react';
import { DateTime } from 'luxon';

import { Button } from '@/components/ui/button';
import type { OptionT, PlanT } from '@/lib/types/ApiTypes';

const OrderCard = ({
  options,
  plan,
  setDialogOpen,
}: {
  options: OptionT[];
  plan: PlanT;
  setDialogOpen: (id: number) => void;
}) => {
  const date = DateTime.fromFormat(plan.date, 'yyyy-MM-dd');
  const isToday = date.day === DateTime.local().day;
  const noPackage = plan.id === null;
  const disabled =
    !plan.order &&
    (!plan.can_order || noPackage || date.diffNow('days').days < 0);

  const boughtOption = options.find(
    (option) =>
      option.title.toLowerCase() === plan.order?.dietary.toLowerCase(),
  );

  return (
    <div
      className={clsx(
        'flex h-36 gap-4 rounded-lg border border-line-primary p-4 md:min-w-[640px]',
        disabled
          ? 'bg-surface-secondary text-text-disabled'
          : 'text-text-primary ',
      )}
    >
      <div
        className={clsx(
          plan.order ? 'bg-primary text-text-tertiary' : 'text-text-primary',
          'my-auto flex size-24 shrink-0 flex-col items-center justify-center rounded-lg border border-line-primary p-2 md:size-[112px]',
        )}
      >
        <div className='font-bold'>{isToday ? 'Today' : date.weekdayLong}</div>
        <div className='text-button-light'>{date.toFormat('dd MMMM')}</div>
      </div>
      {noPackage ? (
        <div className='flex items-center text-sub3-bold text-text-disabled md:text-sub2-bold'>
          No package available
        </div>
      ) : (
        <div className='flex grow flex-col justify-between rounded-lg'>
          <div className='flex justify-between'>
            <div className='max-w-28 truncate text-sub3-bold font-bold md:max-w-36 md:text-sub2-bold'>
              {plan.title}
            </div>
            <div className='flex items-center gap-1 font-bold'>
              <span
                className={
                  plan.discounted_price
                    ? 'text-sub3-bold text-text-disabled line-through'
                    : 'text-h3-bold text-text-primary md:text-h2-bold'
                }
              >
                {plan.price}€
              </span>
              {!!plan.discounted_price && (
                <span className='text-h4-bold md:text-h2-bold'>
                  {plan.discounted_price}€
                </span>
              )}
            </div>
          </div>
          {boughtOption && (
            <span className='line-clamp-2 max-w-[350px] text-xs font-normal text-text-primary'>
              {boughtOption.description}
            </span>
          )}
          <div className='flex h-8 items-center justify-between'>
            <div className='flex items-center gap-1'>
              <Clock className='text-icon-primary' />
              <span className='text-sub3-medium'>{`${plan.start_time} - ${plan.end_time}`}</span>
            </div>
            {!plan.order && (
              <Button
                disabled={!plan.can_order}
                onClick={() => setDialogOpen(plan.id)}
                variant='default'
                className='!text-sub3-bold text-text-tertiary md:!text-sub2-bold'
              >
                Place order
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
