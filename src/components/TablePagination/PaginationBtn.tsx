import { Button } from '../ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { PaginationItem } from '../ui/pagination';
import { cn } from '@/utils/utils';
import { Dispatch, SetStateAction } from 'react';

type PropsT = {
  page: number;
  isPrev?: boolean;
  isNext?: boolean;
  isCurr?: boolean;
  disabled?: boolean;
  setCurrPage: Dispatch<SetStateAction<number>>;
};

const PaginationBtn = ({
  page,
  isPrev,
  isNext,
  isCurr,
  disabled = false,
  setCurrPage,
}: PropsT) => {
  return (
    <PaginationItem>
      <Button
        disabled={disabled}
        onClick={() => setCurrPage(page)}
        variant='secondary'
        className={cn(
          isCurr ? 'bg-primary' : 'hover:bg-primary',
          'flex items-base gap-2 justify-center'
        )}
      >
        {isPrev && (
          <>
            <ChevronLeftIcon />
            قبلی
          </>
        )}
        {!isPrev && !isNext && page}
        {isNext && (
          <>
            بعدی
            <ChevronRightIcon />
          </>
        )}
      </Button>
    </PaginationItem>
  );
};

export default PaginationBtn;
