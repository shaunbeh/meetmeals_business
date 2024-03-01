import { Button } from '../../button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { PaginationItem } from '../../pagination';
import { cn } from '@/lib/utils';

type PropsT = {
  page: number;
  isPrev?: boolean;
  isNext?: boolean;
  isCurr?: boolean;
  disabled?: boolean;
  handleCurrPage: (term: string) => void;
};

const PaginationBtn = ({
  page,
  isPrev,
  isNext,
  isCurr,
  disabled = false,
  handleCurrPage,
}: PropsT) => {
  return (
    <PaginationItem>
      <Button
        disabled={disabled}
        onClick={() => handleCurrPage(page.toString())}
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
