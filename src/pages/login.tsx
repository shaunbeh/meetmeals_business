import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, Global } from 'iconsax-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginImage from 'public/images/png/login.png';
import Logo from 'public/images/png/Logo.png';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { appConfig } from '@/lib/constants';
import endpoints from '@/lib/constants/endpoints';
import { useAppStore } from '@/store';

export function LoginForm({
  phase,
  setPhase,
}: {
  phase: number;
  setPhase: (phase: number) => void;
}) {
  const formSchema = z.object(
    phase === 1
      ? { email: z.string().email() }
      : {
          pin: z.string().min(6, {
            message: 'Your one-time password must be 5 characters.',
          }),
        },
    // email: yup
    //   .string()
    //   .nullable()
    //   .email()
    //   .max(255)
    //   .test('is-empty-or-required', t('validations.emailRequired'), (value) => {
    //     // If the value is empty or null, pass the validation.
    //     if (!value || value.trim() === '') return true;
    //     // If the value is not empty, it must be a valid email.
    //     return yup
    //       .string()
    //       .email(t('validations.validEmail'))
    //       .required(t('validations.emailRequired'))
    //       .isValidSync(value);
    //   }),
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { mutate: getOtp, isPending: isPendingGetOtp } = useMutation({
    mutationFn: (body: { username: string }) =>
      axios.post(`${appConfig.apiUrl}${endpoints.getOTP.url}`, body),
    onSuccess: () => setPhase(2),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await getOtp({ username: values.email });
      // setIsOpen(false);
      // form.reset();
      // refetchOffers();
    } catch (error: any) {
      // toast.error(error?.response?.data?.message);
    }
  }

  const submitTitle = phase === 1 ? 'Login' : 'Continue';
  const toggleSubmit = () => (phase === 1 ? setPhase(2) : setPhase(1));

  return (
    <div>
      {/* {phase === 1 ? (
        <Form className='p-xl-2 p-lg-2 p-md-2 p-sm-2 w-100 position-relative  mt-4 p-0'>
          <Form.Group>
            <Row className='inputBorder  m-0 py-2'>
              <Form.Control
                className='big-Font border-0'
                type='text'
                name='username'
                value={username}
                placeholder='Username'
                onChange={(e) => handleDescChange('username', e.target.value)}
              />
            </Row>
            <Row className='redColor medium-Font  formError  m-0 pt-2'>
              {errorUsername}
            </Row>
          </Form.Group>
          <Row className='w-100 m-0'>
            <Button
              className='green-bg big-Font  w-100 mt-3 border-0 text-white'
              type='submit'
              onClick={sendVerificationCode}
              disabled={
                errorUsername.length !== 0 || username.length < 5 || loading
              }
              style={{
                borderRadius: 12,
                height: '48px',
                borderColor: '#015248',
              }}
            >
              {loading ? (
                <Spinner
                  animation='border'
                  style={{ width: '20px', height: '20px' }}
                />
              ) : (
                'Next'
              )}
            </Button>
          </Row>
        </Form>
      ) : (
        <Form className='p-xl-2 p-lg-2 p-md-2 p-sm-2 w-100 position-relative p-0'>
          <Form.Group>
            <div className='w-100' onClick={() => setPhase(1)}>
              <p
                className='pointer'
                style={{ margin: '1rem auto auto', width: 'fit-content' }}
              >
                Edit username
              </p>
            </div>
            <Row className='inputBorder  m-0 py-2'>
              <Form.Control
                className='big-Font border-0'
                type='text'
                name='code'
                value={code}
                placeholder='Verification code'
                onChange={(e) => handleDescChange('code', e.target.value)}
              />
            </Row>
            <Row className='redColor medium-Font formError m-0 pt-2'>
              {errorCode}
            </Row>
          </Form.Group>
          <Row className='w-100 m-0'>
            <Button
              className='green-bg d-flex justify-content-center align-items-center big-Font w-100 mt-3 border-0 text-white'
              type='submit'
              onClick={submitLogin}
              disabled={code.length !== 5 || loading}
              style={{
                borderRadius: 12,
                height: '48px',
                borderColor: '#015248',
              }}
            >
              {loading ? (
                <Spinner
                  animation='border'
                  style={{ width: '20px', height: '20px' }}
                />
              ) : (
                'Submit'
              )}
            </Button>
            <div className='d-flex w-100 pointer mt-2'>
              <div
                style={{ margin: 'auto', width: 'fit-content' }}
                onClick={sendVerificationCode}
              >
                Didn&apos;t get the code?
              </div>
            </div>
          </Row>
        </Form>
      )} */}
      <div className=''>
        <h2 className='text-h2-bold'>
          {phase === 1 ? 'Login' : 'Verification'}
        </h2>
        <p className='text-par'>
          {phase === 1
            ? 'Welcome back! Please enter your email address.'
            : `Please enter the verification code sent to
          ${form.getValues('email')}.`}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {phase === 1 ? (
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm text-text-primary'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name='pin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-par-medium'>
                    Verification code
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className='gap-1'>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className='flex w-full gap-2'>
            <Button
              disabled={!!Object.keys(form.formState.errors).length}
              size='lg'
              className='w-32 grow font-bold'
              // type='submit'
              onClick={toggleSubmit}
            >
              {isPendingGetOtp ? 'Loading...' : submitTitle}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function Login() {
  const [phase, setPhase] = useState(1);

  const { lang, user, toggleLang } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (user.token) router.push('/');
  }, [user, router]);

  const handleBack = () => {
    if (phase === 1) {
      router.push(process.env.NEXT_PUBLIC_APP_URL ?? 'http://meetmeals.nl');
    } else {
      setPhase(1);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='relative flex h-screen min-w-[375px] justify-between p-6 text-text-primary'>
        <div className='mx-10 flex h-fit w-full min-w-[33%] flex-col gap-32 rounded-lg border p-6 lg:w-auto lg:border lg:border-none'>
          <div className='flex items-center'>
            {phase === 2 && (
              <Button
                onClick={handleBack}
                variant='ghost'
                className='-m-2 flex items-center gap-2 rounded-lg p-2 font-bold text-black hover:bg-surface-background [&>svg]:hover:scale-110'
              >
                <ArrowLeft className='text-icon-primary' /> Back
              </Button>
            )}
            <Button onClick={toggleLang} variant='ghost' className='flex gap-2'>
              <Global />
              <span className='font-bold uppercase'>{lang}</span>
            </Button>
          </div>
          <div className='flex flex-col gap-8'>
            <Image src={Logo} alt='logo' width={100} height={100} />
            <LoginForm phase={phase} setPhase={setPhase} />
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
