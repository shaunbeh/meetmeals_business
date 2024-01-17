import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { pairsColumns } from './helpers';
import { TableRowT } from './types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '../ui/pagination';
import { Button } from '../ui/button';

export default function PairsTable({
  data,
  currPage,
  handleCurrPage,
}: {
  data: TableRowT[];
  currPage: number;
  handleCurrPage: (p: number) => void;
}) {
  const table = useReactTable({
    columns: pairsColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className='my-4 relative overflow-x-auto flex flex-col pb-10'>
      <div className='py-2 align-middle inline-block min-w-full'>
        <div className='shadow overflow-hidden border border-gray-200 sm:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' ▼',
                          desc: ' ▲',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {table
                .getRowModel()
                .rows.slice(0, 50)
                .map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className='px-4 py-2 text-center whitespace-nowrap'
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination className='absolute left-0 right-0 bottom-0'>
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={currPage == 1}
              onClick={() => handleCurrPage(currPage - 1)}
              variant='secondary'
              className='flex hover:bg-primary items-base gap-2 justify-center'
            >
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
              >
                <path
                  d='M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'
                ></path>
              </svg>
              قبلی
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              disabled
              onClick={() => handleCurrPage(currPage - 1)}
              variant='secondary'
              className='flex bg-primary items-base gap-2 justify-center'
            >
              {currPage}
            </Button>
          </PaginationItem>
          <Button
            onClick={() => handleCurrPage(currPage + 1)}
            variant='secondary'
            className='flex hover:bg-primary items-base gap-2 justify-center'
          >
            بعدی
            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
            >
              <path
                d='M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z'
                fill='currentColor'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          </Button>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
