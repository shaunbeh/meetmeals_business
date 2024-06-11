import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

import BasicTable from '@/components/ui/Table';

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
        TableClassName='!border-solid border-[#e5e5e5] mt-4'
        headerClassName='!rounded-none bg-black text-white  font-bold capitalize text-sm'
        rowClassName='bg-level1-foreground/10'
      />
      {data.length > 3 && (
        <div className='flex items-center justify-center'>
          <button
            onClick={() =>
              setNumberOfRows((prev) => (prev === 3 ? data.length : 3))
            }
            className='flex h-10 w-[180px] items-center justify-center border border-black/20 hover:border-level1-foreground hover:bg-level1-foreground'
          >
            {`See ${numberOfRows === 3 ? 'more' : 'less'}`}
          </button>
        </div>
      )}
    </>
  );
}

export default CustomTable;
