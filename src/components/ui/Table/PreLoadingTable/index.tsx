import Table from 'rc-table';

import { columnsCreator } from './services';

interface ILoadingTable {
  /** option to enable table header */
  showHeader: boolean;
  /** number of table rows */
  tableRows: number;
  /** number of table columns */
  tableColumns: number;
  /** height of table row */
  rowHeight?: number;
  /** height of table header */
  headerHeight?: number;
}

export interface ILoadingTableColumn {
  [key: string]: string;
}

/** skeleton loading for table */
const PreLoadingTable = ({
  showHeader,
  tableRows,
  tableColumns,
  rowHeight = 2.75,
  headerHeight = 3.75,
}: ILoadingTable) => {
  const data: ILoadingTableColumn[] = [];
  for (let i = 0; i < tableRows; i++) {
    const eachRow: ILoadingTableColumn = {};
    for (let j = 0; j < tableColumns; j++) {
      eachRow.column = String(j);
    }
    data.push(eachRow);
  }

  return (
    <>
      <Table
        showHeader={showHeader}
        columns={columnsCreator(tableColumns, headerHeight)}
        data={[data[0]]}
        rowKey={() => Math.random()}
        className='mb-3 mt-1.5'
        data-testid='loading-table'
      />
      <div className=''>
        {data.map((_, index: number) => (
          <div
            key={index}
            className='mb-2 flex w-full items-center'
            style={{ height: `${rowHeight}rem` }}
            data-testid='loading-tablerow'
          >
            <div className='skeleton mx-auto size-full overflow-hidden !rounded-2xl' />
          </div>
        ))}
      </div>
    </>
  );
};

export default PreLoadingTable;
