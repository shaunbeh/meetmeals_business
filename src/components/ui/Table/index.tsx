import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function BasicTable<T>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T, any>[];
}) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='my-4 flex flex-col pb-10'>
      <div className='inline-block'>
        <div className='custom-scroll-thin w-full overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200 border-none outline-none'>
            <thead className='overflow-hidden rounded-lg'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className='overflow-hidden rounded-xl' key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='rounded-lg border-none bg-popover px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-black first:rounded-s-lg last:rounded-e-lg'
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
                          header.getContext(),
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
            <tbody className='border-none'>
              {table
                .getRowModel()
                .rows.slice(0, 50)
                .map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className='whitespace-nowrap px-4 py-3 text-center'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
