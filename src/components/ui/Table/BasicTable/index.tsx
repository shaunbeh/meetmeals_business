import Table from 'rc-table';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import type { TableProps } from 'rc-table/lib/Table';

import PreLoadingTable from '../PreLoadingTable';

interface IBasicTableProps<RecordType = unknown>
  extends Omit<TableProps<RecordType>, 'emptyText'> {
  /** this flag indicates loading state */
  loading?: boolean;
  /** number of table rows */
  tableRows?: number;
  /** number of table columns */
  tableColumns?: number;
  /** height of table row */
  rowHeight?: number;
  /** height of table header */
  headerHeight?: number;
}

/** This is basic table of whole project */
function BasicTable<RecordType extends DefaultRecordType>({
  loading = false,
  tableRows = 5,
  tableColumns = 6,
  rowHeight = 2.75,
  headerHeight = 3.5,
  ...rest
}: IBasicTableProps<RecordType>) {
  const emptyText = () => (
    <p
      className='mx-auto py-8 text-center text-sm text-slate-500'
      data-testid='table-emptytext'
    >
      {!loading ? 'No Data' : ''}
    </p>
  );
  return (
    <div className='my-5'>
      {loading ? (
        <PreLoadingTable
          showHeader
          tableRows={tableRows}
          tableColumns={tableColumns}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
        />
      ) : (
        <Table
          {...rest}
          style={{ width: '100%', tableLayout: 'auto' }}
          scroll={{ x: '100vh' }}
          rowKey={(record) => record.id}
          emptyText={emptyText}
          data-testid='actual-table'
        />
      )}
    </div>
  );
}

export default BasicTable;
