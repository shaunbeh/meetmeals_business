import BasicTable from "@/components/ui/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

function CustomTable<T>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T, any>[];
}) {
  const [numberOfRows, setNumberOfRows] = useState(3);
  return (
    <>
      <BasicTable
        data={data.slice(0, numberOfRows)}
        columns={columns}
        TableClassName="!border-solid border-[#e5e5e5] mt-4"
        headerClassName="!rounded-none bg-black text-white  font-bold capitalize text-sm"
        rowClassName="bg-level1-foreground/10"
      />
      {data.length > 3 && (
        <div className="flex justify-center items-center">
          <button
            onClick={() =>
              setNumberOfRows((prev) => (prev === 3 ? data.length : 3))
            }
            className="border border-black/20 hover:bg-level1-foreground hover:border-level1-foreground w-[180px] h-10 flex items-center justify-center"
          >
            {`See ${numberOfRows === 3 ? "more" : "less"}`}
          </button>
        </div>
      )}
    </>
  );
}

export default CustomTable;
