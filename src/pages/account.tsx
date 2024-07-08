/* eslint-disable tailwindcss/no-custom-classname */
// import { useState } from 'react';

import Layout from '@/components/Layout';
import {
  Pagination,
  // PaginationContent,
  // PaginationItem,
  // PaginationLink,
  // PaginationNext,
  // PaginationPrevious,
} from '@/components/ui/pagination';
import BasicTable from '@/components/ui/Table/BasicTable';

export default function Account() {
  // const [currPage, setCurrPage] = useState(1);
  // const handlePageChange = (page: number) => {
  // console.log(page);
  // };
  return (
    <Layout title='Account'>
      <div>
        <BasicTable className='reactTable' columns={[]} data={[]} />
        <Pagination>
          {/* <PaginationContent>
          {data?.prev_page_url ? (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currPage - 1)}
                href='#'
              />
            </PaginationItem>
          ) : null}
          {new Array(pageCount).fill(0).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href='#'
                onClick={() => handlePageChange(i + 1)}
                isActive={i + 1 === currPage}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {data?.next_page_url ? (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currPage + 1)}
                href='#'
              />
            </PaginationItem>
          ) : null}
        </PaginationContent> */}
        </Pagination>
      </div>
    </Layout>
  );
}
