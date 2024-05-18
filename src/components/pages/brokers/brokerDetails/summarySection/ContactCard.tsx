import Image from 'next/image';
import CallIcon from 'public/images/png/callIcon.png';
import EmailIcon from 'public/images/png/emailIcon.png';
import NetIcon from 'public/images/png/netIcon.png';
import text from 'public/locales/fa/brokerDetails.json';

import CardLayout from './CardLayout';

const ContactCard = () => (
  <CardLayout title={text.summarySection.contact} bgColor='#fff8f3' showIcon>
    <div className='flex items-center gap-4'>
      <Image alt='call' src={CallIcon} width={22} height={22} />
      <span>+447441911059</span>
    </div>
    <div className='flex items-center gap-4'>
      <Image alt='call' src={EmailIcon} width={22} height={22} />
      <span>support@fxcentrum.com</span>
    </div>
    <div className='flex items-center gap-4'>
      <Image alt='call' src={NetIcon} width={22} height={22} />
      <span>https://fxcentrum.com</span>
    </div>
  </CardLayout>
);

export default ContactCard;
