import WhiteCard from '../WhiteCard';
import DepositTable from './DepositTable';
import WithdrawTable from './WithdrawalTable';

const BrokerDepositAndWithdrawal = ({ id }: { id: string }) => (
  <WhiteCard className='p-10'>
    <h2 className='text-2xl font-bold' id={id}>
      Deposit and Withdrawal
    </h2>
    <div className='flex items-center gap-2'>
      <span className='text-4xl font-bold'>8</span>
      <span className='text-sm font-bold'>Outstanding</span>
    </div>
    <DepositTable />
    <WithdrawTable />
  </WhiteCard>
);

export default BrokerDepositAndWithdrawal;
