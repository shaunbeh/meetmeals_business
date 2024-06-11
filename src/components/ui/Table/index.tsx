import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

export default function BasicTable<T>({
  data,
  columns,
  TableClassName,
  headerClassName,
  rowClassName,
}: {
  data: T[];
  columns: ColumnDef<T, any>[];
  TableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
}) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-4 flex flex-col pb-10">
      <div className="inline-block">
        <div className="overflow-x-auto w-full custom-scroll-thin">
          <table
            className={cn(
              "min-w-full divide-y divide-gray-200 border-none outline-none",
              TableClassName
            )}
          >
            <thead className="rounded-lg overflow-hidden">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="overflow-hidden rounded-xl" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "px-4 border-none py-3 text-center text-xs font-medium text-black uppercase tracking-wider first:rounded-s-lg last:rounded-e-lg bg-popover ropunded-lg",
                        headerClassName
                      )}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: " ▼",
                          desc: " ▲",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="border-none">
              {table
                .getRowModel()
                .rows.slice(0, 50)
                .map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "hover:bg-secondary",
                      rowClassName
                        ? rowIndex % 2 === 0
                          ? ""
                          : rowClassName
                        : ""
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-center whitespace-nowrap"
                        >
                          {cell.getContext().cell.getValue() !== "" &&
                          cell.getContext().cell.getValue() !== null
                            ? flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            : "-"}
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
  );
}
