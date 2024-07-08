import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { ArrowLeft, Global } from 'iconsax-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginImage from 'public/images/png/Login.png';
import Logo from 'public/images/png/Logo.png';
import { useState } from 'react';

import LoginForm from '@/components/pages/login/LoginForm';
import OtpForm from '@/components/pages/login/OtpForm';
import { Button } from '@/components/ui/button';
import { LoginSteps } from '@/lib/constants/enums';
import { useAppStore } from '@/store';

export default function Login() {
  const [step, setStep] = useState(LoginSteps.email);
  const [email, setEmail] = useState('');

  const { lang, toggleLang } = useAppStore();
  const router = useRouter();

  const handleBack = () => {
    if (step === LoginSteps.otp) {
      setStep(LoginSteps.email);
    } else {
      router.push('https://meetmeals.nl');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='relative flex h-screen w-full min-w-[375px] items-center justify-center p-2 text-text-primary md:p-6 lg:items-stretch lg:justify-between lg:gap-6'>
        <div className='mx-auto flex h-fit w-full max-w-[600px] flex-col gap-16 rounded-lg border px-4 py-10 md:mx-10 md:px-6 lg:w-auto lg:min-w-[400px] lg:gap-32 lg:border-none'>
          <div className='flex items-center'>
            <Button
              onClick={handleBack}
              variant='ghost'
              className='relative -m-2 flex items-center gap-2 rounded-lg p-2 ps-10 font-bold text-black transition-all hover:bg-surface-background [&>#arrow]:hover:opacity-100 [&>#chevron]:hover:translate-x-0 [&>#chevron]:hover:scale-150 [&>#chevron]:hover:opacity-0 [&>svg]:hover:scale-110'
            >
              <ChevronLeftIcon
                id='chevron'
                className='absolute start-1 w-6 translate-x-3 scale-125 text-icon-primary transition-all'
              />
              <ArrowLeft
                id='arrow'
                className='absolute start-2 w-6 text-icon-primary opacity-0 transition-all'
              />{' '}
              Back
            </Button>
            <Button
              onClick={toggleLang}
              variant='ghost'
              className='ms-auto flex gap-2 [&>span]:hover:scale-110'
            >
              <Global />
              <span className='w-5 font-bold uppercase'>{lang}</span>
            </Button>
          </div>
          <div className='flex flex-col gap-8'>
            <Image
              src={Logo}
              alt='logo'
              className='h-16 w-36'
              width={100}
              height={100}
            />
            {step === LoginSteps.email && (
              <LoginForm setEmail={setEmail} setStep={setStep} />
            )}
            {step === LoginSteps.otp && email.length > 0 && (
              <OtpForm email={email} />
            )}
          </div>
        </div>
        <div className='relative hidden grow lg:block'>
          <Image
            src={LoginImage}
            className='rounded-xl object-cover'
            layout='fill'
            alt='login image'
          />
        </div>
      </div>
    </>
  );
}
