import { ArrowLeft, Global } from 'iconsax-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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

  const handleBack = () => {
    if (step === LoginSteps.otp) {
      setStep(LoginSteps.email);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='container relative flex h-screen w-full min-w-[375px] items-center justify-center p-2 text-text-primary lg:items-stretch lg:justify-between lg:p-6'>
        <div className='mx-auto flex h-fit w-full flex-col gap-32 rounded-lg border p-4 lg:mx-10 lg:w-auto lg:min-w-[500px] lg:border lg:border-none lg:p-6'>
          <div className='flex items-center'>
            {step === LoginSteps.otp && (
              <Button
                onClick={handleBack}
                variant='ghost'
                className='-m-2 flex items-center gap-2 rounded-lg p-2 font-bold text-black hover:bg-surface-background [&>svg]:hover:scale-110'
              >
                <ArrowLeft className='text-icon-primary' /> Back
              </Button>
            )}
            <Button
              onClick={toggleLang}
              variant='ghost'
              className='ms-auto flex gap-2'
            >
              <Global />
              <span className='font-bold uppercase'>{lang}</span>
            </Button>
          </div>
          <div className='flex flex-col gap-8 '>
            <Image src={Logo} alt='logo' width={100} height={100} />
            {step === LoginSteps.email && (
              <LoginForm setEmail={setEmail} setStep={setStep} />
            )}
            {step === LoginSteps.otp && email.length > 0 && (
              <OtpForm email={email} />
            )}
          </div>
        </div>
        <Link href='/' className='relative hidden grow lg:block'>
          <Image
            src={LoginImage}
            className='rounded-xl object-cover'
            layout='fill'
            alt='login image'
          />
        </Link>
      </div>
    </>
  );
}
