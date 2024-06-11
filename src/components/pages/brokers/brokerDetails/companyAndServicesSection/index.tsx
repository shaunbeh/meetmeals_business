import type { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import WhiteCard from '../WhiteCard';
import CustomTable from '../withdrawalAndDepositSection/CustomTabe';

const contactColumns: ColumnDef<(typeof fakeTableData)[0]>[] = [
  {
    header: 'Country',
    accessorKey: 'country',
    cell: (row) => (
      <div className='mx-2 flex size-full items-center justify-center'>
        <Image
          width={100}
          height={100}
          src={String(row.getValue())}
          alt='contact'
          className='h-[44px] w-[58px]'
        />
      </div>
    ),
  },
  {
    header: 'Office Type',
    accessorKey: 'officeType',
  },
  {
    header: 'Phone Numbers',
    accessorKey: 'phoneNumbers',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
];
const fakeTableData = [
  {
    country: '/images/png/flagIcon.png',
    officeType: 'Headquarters',
    phoneNumbers: '+447441911059',
    email: 'globalsupport@wetradefx.com',
  },
];

const fakeOthersData = {
  Website_language: 'Chinese(Simplified), English, Thai, Vietnamese',
  customer_service_by:
    'Phone, Email, Live Chat, Facebook, Youtube, Weibo, WeChat',
  supported_language: 'Chinese(Simplified), English, Thai, Vietnamese',
};

const fakeData = {
  headquarters_address: 'Office 5B, HIS building, Providence Mahé, Seychelles',
  founded: '2019',
  brokerType: 'STP, ECN',
  time_zone: 'GMT +1',
  credit_profile: 'No information',
};
const BrokerCompanyAndServicesSection = ({ id }: { id: string }) => {
  const renderDataAsTwoColumns = (data: { [key: string]: string }) => (
    <div className='flex flex-col gap-4 pt-5'>
      {Object.entries(data).map(([key, value]) => (
        <div className='flex items-center gap-10' key={key}>
          <span className='w-[200px] text-sm capitalize'>
            {key.replace(/_/g, ' ')}
          </span>
          <span className='text-sm font-bold capitalize'>{value}</span>
        </div>
      ))}
    </div>
  );
  return (
    <WhiteCard className='pt-10 '>
      <h2 className='text-2xl font-bold'>Company and Service</h2>
      <div className='flex items-center gap-2' id={id}>
        <span className='text-4xl font-bold'>8</span>
        <span className='text-sm font-bold'>score</span>
      </div>
      <h4 className='mt-4  font-bold'>Profile</h4>
      {renderDataAsTwoColumns(fakeData)}
      <h4 className='mt-4  font-bold'>Trading Platforms</h4>
      <div className='flex flex-col gap-4 pt-5'>
        <div className='flex items-center gap-10'>
          <span className='w-[200px] text-sm capitalize'>MT4</span>
          <span className='text-sm font-bold capitalize'>
            Mac, Windows, iOS, Android
          </span>
        </div>
      </div>
      <h4 className='mt-4  font-bold'>Contact</h4>
      <CustomTable data={fakeTableData} columns={contactColumns} />
      <h4 className='mt-4  font-bold'>Others</h4>
      {renderDataAsTwoColumns(fakeOthersData)}
    </WhiteCard>
  );
};

export default BrokerCompanyAndServicesSection;
