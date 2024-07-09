import Image from 'next/image';
import Logo from 'public/images/png/Logo.png';

import { LoginSteps } from '@/lib/constants/enums';

import LoginForm from './LoginForm';
import OtpForm from './OtpForm';

export default function LoginMainForms({
  step,
  setStep,
  email,
  setEmail,
}: {
  step: LoginSteps;
  setStep: (step: LoginSteps) => void;
  email: string;
  setEmail: (email: string) => void;
}) {
  // const toggleSubmit = () =>
  //   step === LoginSteps.email
  //     ? setStep(LoginSteps.otp)
  //     : setStep(LoginSteps.email);

  return (
    <div className='flex flex-col gap-8 md:min-w-[440px]'>
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
      {step === LoginSteps.otp && email.length > 0 && <OtpForm email={email} />}
      {/* <button onClick={toggleSubmit}>toggle</button> */}
    </div>
  );
}
