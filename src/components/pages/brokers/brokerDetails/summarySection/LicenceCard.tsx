import Image from 'next/image';
import FlagImg from 'public/images/png/flagIcon.png';
import text from 'public/locales/fa/brokerDetails.json';

import CardLayout from './CardLayout';

type PropsType = {
  bgColor: string;
};
const LicenceCard = ({ bgColor }: PropsType) => (
  <CardLayout
    title={text.summarySection.licenceStatus}
    bgColor='#fff8f3'
    showIcon
  >
    <div className='flex items-center gap-4'>
      <div
        className={`h-6 w-[60px] text-center text-sm font-bold uppercase ${bgColor}`}
      >
        c
      </div>
      <Image src={FlagImg} alt='flag' width={24} height={16} />
      <span className='truncate text-sm '>seycheles</span>
      <span className='text-sm font-bold'>SD055</span>
      <div className='h-5 truncate bg-blue px-2 text-center text-sm font-medium capitalize text-blue-foreground'>
        Authorised
      </div>
    </div>
  </CardLayout>
);

export default LicenceCard;
