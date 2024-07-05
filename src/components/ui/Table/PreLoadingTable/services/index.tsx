import type {
  ColumnGroupType,
  ColumnsType,
  ColumnType,
} from 'rc-table/lib/interface';

import type { ILoadingTableColumn } from '..';

export const columnsCreator = (tableColumns: number, headerHeight: number) => {
  const columnsAmount: (
    | ColumnGroupType<ILoadingTableColumn>
    | ColumnType<ILoadingTableColumn>
  )[] = [];
  for (let i = 0; i < tableColumns; i++) {
    columnsAmount.push({
      title: (
        <div
          style={{ height: `${headerHeight}rem` }}
          className='flex justify-end'
          data-testid='loading-tablehead'
        >
          <div className='skeleton size-full overflow-hidden !rounded-lg' />
        </div>
      ),
      dataIndex: '',
      align: 'center',
      width: `${100 / tableColumns}%`,
      className: '!border-0 text-sub2-medium',
    });
  }
  const columns: ColumnsType<ILoadingTableColumn> = columnsAmount;

  return columns;
};
