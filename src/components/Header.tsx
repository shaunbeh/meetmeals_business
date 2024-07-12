import { Global, Profile } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/images/png/Logo.png';

import { useAppStore } from '@/store';

import { Button } from './ui/button';

const Header = () => {
  const user = useAppStore((store) => store.user);
  const toggleLang = useAppStore((store) => store.toggleLang);
  const lang = useAppStore((store) => store.lang);

  return (
    <div className='fixed top-0 z-50 flex h-[64px] w-full items-center justify-between bg-white px-2 text-par font-medium text-text-primary lg:px-8'>
      <div className='flex items-center gap-4 md:gap-8 lg:gap-12'>
        <Link href='/' className=' text-xl text-primary'>
          <Image src={Logo} width={100} height={100} alt='logo' />
        </Link>
        {user?.organization?.name && (
          <div className='rounded-lg bg-surface-secondary px-2 py-1 text-sub3-bold font-bold uppercase text-text-disabled md:px-4 md:py-2 md:text-sub2-bold'>
            {user.organization.name.slice(0, 4)}
          </div>
        )}
      </div>
      <div className='flex items-center gap-1 md:gap-3'>
        <Button
          variant='ghost'
          className='flex h-10 w-12 items-center justify-between gap-1 p-1 py-0 uppercase md:w-16 md:gap-2 md:p-2'
          onClick={toggleLang}
        >
          <Global className='size-6' />
          {lang}
        </Button>
        <Link
          href='/account'
          className='flex h-10 cursor-pointer items-center justify-center gap-1 rounded-lg p-2 hover:bg-surface-secondary'
        >
          <Profile className='size-6' />
          {user?.first_name && user?.last_name && (
            <span className='hidden truncate text-nowrap md:block'>{`${user.first_name} ${user.last_name}`}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
