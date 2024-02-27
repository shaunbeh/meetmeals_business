import { Dispatch, SetStateAction, memo } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
} from '../../ui/pagination';
import PaginationBtn from './PaginationBtn';
import { paginate } from './services/pagination';

type PropsT = {
  currPage: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
  pageCount: number;
};

export const TablePagingation = memo(function memoizedPagination({
  currPage,
  setCurrPage,
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
          setCurrPage={setCurrPage}
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
              setCurrPage={setCurrPage}
              key={i}
            />
          )
        )}
        <PaginationBtn
          setCurrPage={setCurrPage}
          isNext
          page={currPage + 1}
          disabled={currPage == pageCount}
        />
      </PaginationContent>
    </Pagination>
  );
});
