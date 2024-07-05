import { Global, Profile } from 'iconsax-react';
import Image from 'next/image';
import Logo from 'public/images/png/Logo.png';

const MenuItems = ({ title }: { title: string }) => (
  <div
    key={title}
    className='flex h-10 cursor-pointer items-center justify-center whitespace-nowrap px-3 text-sm font-bold capitalize text-white hover:bg-secondary-foreground'
  >
    {title}
  </div>
);

const menuItemsList = [
  {
    title: 'brokers',
  },
  {
    title: 'scam',
  },
  {
    title: 'BV Assessment',
  },
  {
    title: 'rankings',
  },
  {
    title: 'regulators',
  },
  {
    title: 'news',
  },
  {
    title: 'claims',
  },
  {
    title: 'expo',
  },
  {
    title: 'event',
  },
  {
    title: 'awards',
  },
];

const Header = () => (
  <div className='fixed top-0 z-50 flex h-[64px] w-full items-center justify-between text-par font-medium text-text-primary'>
    <span className='h-7 w-[190px] text-xl text-primary'>
      <Image src={Logo} width={100} height={100} alt='logo' />
    </span>
    <div className='ml-[60px] hidden items-center xl:flex'>
      {menuItemsList.map((item) => (
        <MenuItems key={item.title} title={item.title} />
      ))}
    </div>
    <div className='flex items-center gap-3'>
      <button className='flex h-10 items-center justify-center gap-2'>
        <Global className='size-6' />
        NL
      </button>
      <div className='flex size-10 cursor-pointer items-center justify-center'>
        <Profile className='size-6' />
      </div>
    </div>
  </div>
);

export default Header;
