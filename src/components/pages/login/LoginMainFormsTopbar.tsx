import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { ArrowLeft, Global } from 'iconsax-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { LoginSteps } from '@/lib/constants/enums';
import { useAppStore } from '@/store';

export default function LoginMainFormsTopbar({
  setStep,
  step,
}: {
  setStep: (phase: LoginSteps) => void;
  step: LoginSteps;
}) {
  const toggleLang = useAppStore((store) => store.toggleLang);
  const lang = useAppStore((store) => store.lang);

  const router = useRouter();

  const handleBack = () => {
    if (step === LoginSteps.otp) {
      setStep(LoginSteps.email);
    } else {
      router.push('https://meetmeals.nl');
    }
  };
  return (
    <div className='flex items-center justify-between'>
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
        className='flex gap-2 [&>span]:hover:scale-110'
      >
        <Global />
        <span className='w-5 font-bold uppercase'>{lang}</span>
      </Button>
    </div>
  );
}
