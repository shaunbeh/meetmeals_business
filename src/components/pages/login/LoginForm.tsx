import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
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
import { apiClient } from '@/lib/axios';
import { appConfig } from '@/lib/constants';
import endpoints from '@/lib/constants/endpoints';
import { LoginSteps } from '@/lib/constants/enums';

export default function LoginForm({
  setStep,
  setEmail,
}: {
  setStep: (phase: LoginSteps) => void;
  setEmail: (email: string) => void;
}) {
  const formSchema = z.object({
    email: z.string().email().max(255),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const { mutate: getOtp, isPending: isPendingGetOtp } = useMutation({
    mutationFn: (body: { username: string }) =>
      apiClient.post(`${appConfig.apiUrl}${endpoints.getOTP.url}`, body),
    onSuccess: () => {
      setEmail(form.getValues('email'));
      setStep(LoginSteps.otp);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await getOtp({ username: values.email });
    } catch (error: any) {
      // toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className='flex w-full flex-col gap-9'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-h2-bold'>Login</h2>
        <p className='text-par'>
          Welcome back! Please enter your email address.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
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
          <div className='flex w-full gap-2'>
            <Button
              disabled={
                !!Object.keys(form.formState.errors).length || isPendingGetOtp
              }
              size='lg'
              className='w-32 grow font-bold'
              type='submit'
            >
              {isPendingGetOtp ? (
                <ReloadIcon className='animate-spin' />
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
