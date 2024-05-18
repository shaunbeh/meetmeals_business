import { memo } from 'react';

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

export const TablePagingationComponent = ({
  currPage,
  handleCurrPage,
  pageCount,
}: PropsT) => {
  const { items } = paginate({
    current: currPage,
    max: pageCount,
  });
  const content = items.map((i) => {
    if (typeof i === 'string') {
      return <PaginationEllipsis key={i} />;
    }
    return (
      <PaginationBtn
        page={i}
        isCurr={i === currPage}
        disabled={i === currPage}
        handleCurrPage={handleCurrPage}
        key={i}
      />
    );
  });

  return (
    <Pagination className='bottom-1'>
      <PaginationContent>
        <PaginationBtn
          handleCurrPage={handleCurrPage}
          isPrev
          page={currPage - 1}
          disabled={currPage === 1}
        />
        {content}
        <PaginationBtn
          handleCurrPage={handleCurrPage}
          isNext
          page={currPage + 1}
          disabled={currPage === pageCount}
        />
      </PaginationContent>
    </Pagination>
  );
};

TablePagingationComponent.displayName = 'TablePagingation';

export const TablePagingation = memo(TablePagingationComponent);
