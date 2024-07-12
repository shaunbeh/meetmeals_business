import Head from 'next/head';
import Image from 'next/image';
import LoginImage from 'public/images/png/Login.png';
import { useState } from 'react';

import LoginMainForms from '@/components/pages/login/LoginMainForms';
import LoginMainFormsTopbar from '@/components/pages/login/LoginMainFormsTopbar';
import { LoginSteps } from '@/lib/constants/enums';

export default function Login() {
  const [step, setStep] = useState(LoginSteps.email);
  const [email, setEmail] = useState('');

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='relative flex h-screen w-full min-w-[375px] items-center justify-center p-2 text-text-primary md:p-6 lg:items-stretch lg:justify-between lg:gap-6'>
        <div className='mx-auto flex h-fit w-full max-w-[600px] flex-col gap-16 rounded-lg border px-4 py-10 md:mx-10 md:px-6 lg:w-auto lg:min-w-[400px] lg:gap-32 lg:border-none'>
          <LoginMainFormsTopbar setStep={setStep} step={step} />
          <LoginMainForms
            step={step}
            setStep={setStep}
            email={email}
            setEmail={setEmail}
          />
        </div>
        <div className='relative hidden grow lg:block'>
          <Image
            src={LoginImage}
            className='rounded-xl object-cover'
            fill
            sizes='1000px'
            priority
            alt='login image'
          />
        </div>
      </div>
    </>
  );
}
