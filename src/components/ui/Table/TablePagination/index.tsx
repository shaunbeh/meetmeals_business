import { Dispatch, SetStateAction, memo } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
} from '../../pagination';
import PaginationBtn from './PaginationBtn';
import { paginate } from './services/pagination';

type PropsT = {
  currPage: number;
  handleCurrPage: (term: string) => void;
  pageCount: number;
};

export const TablePagingation = memo(function memoizedPagination({
  currPage,
  handleCurrPage,
  pageCount,
}: PropsT) {
  const { items } = paginate({
    current: currPage,
    max: pageCount,
  });

  return (
    <Pagination className='bottom-1'>
      <PaginationContent>
        <PaginationBtn
          handleCurrPage={handleCurrPage}
          isPrev
          page={currPage - 1}
          disabled={currPage == 1}
        />
        {items.map((i) =>
          typeof i == 'string' ? (
            <PaginationEllipsis key={i} />
          ) : (
            <PaginationBtn
              page={i}
              isCurr={i == currPage}
              disabled={i == currPage}
              handleCurrPage={handleCurrPage}
              key={i}
            />
          )
        )}
        <PaginationBtn
          handleCurrPage={handleCurrPage}
          isNext
          page={currPage + 1}
          disabled={currPage == pageCount}
        />
      </PaginationContent>
    </Pagination>
  );
});
