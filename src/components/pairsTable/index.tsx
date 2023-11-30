import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { pairsColumns } from './helpers';
import { TableRowT } from './types';

export default function PairsTable({ data }: { data: TableRowT[] }) {
  const table = useReactTable({
    columns: pairsColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className='mt-2 flex flex-col'>
      <div className='-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
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
      </div>
    </div>
  );
}
