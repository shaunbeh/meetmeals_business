import DownloadIcon from 'public/images/svg/download.svg';
import NetIcon from 'public/images/svg/net.svg';
import SearchIcon from 'public/images/svg/search.svg';

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
  <div className='fixed top-0 z-50 flex h-[64px] w-full items-center justify-between bg-black px-4'>
    <span className='h-7 w-[190px] text-xl text-primary'>PLATFORMHA</span>
    <div className='ml-[60px] hidden items-center xl:flex'>
      {menuItemsList.map((item) => (
        <MenuItems key={item.title} title={item.title} />
      ))}
    </div>
    <div className='flex items-center gap-3'>
      <div className='flex size-10 cursor-pointer items-center justify-center bg-secondary-foreground text-white'>
        <SearchIcon className='size-6' />
      </div>
      <div className='flex size-10 cursor-pointer items-center justify-center bg-secondary-foreground text-white'>
        <DownloadIcon className='size-6' />
      </div>
      <div className='flex size-10 cursor-pointer items-center justify-center bg-secondary-foreground text-white'>
        <NetIcon className='size-6' />
      </div>
      <button className='ml-3 flex h-10 w-[90px] items-center justify-center bg-primary text-sm text-white '>
        Sign In
      </button>
    </div>
  </div>
);

export default Header;
