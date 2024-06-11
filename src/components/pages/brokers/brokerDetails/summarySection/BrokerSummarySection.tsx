import { forwardRef } from 'react';

import WhiteCard from '../WhiteCard';
import ContactCard from './ContactCard';
import LicenceCard from './LicenceCard';
import ScoreCard from './ScoreCard';
import SummaryInfo from './SummaryInfo';

type PropsType = { brokerLevel: string};
const BrokerSummarySection = (
  { brokerLevel }: PropsType,
) => {
  let colorClasses = '';
  if (brokerLevel === '1') {
    colorClasses = 'bg-level1-foreground';
  } else if (brokerLevel === '2') {
    colorClasses = '';
  }
  return (
    <WhiteCard  >
      <SummaryInfo brokerLevel={brokerLevel}  />
      <div className='grid gap-4 2xl:grid-cols-3' >
        <ScoreCard />
        <LicenceCard bgColor={colorClasses} />
        <ContactCard />
      </div>
    </WhiteCard>
  );
};

export default BrokerSummarySection;
