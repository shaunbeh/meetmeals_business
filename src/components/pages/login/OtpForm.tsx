import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { apiClient } from '@/lib/axios';
import { appConfig } from '@/lib/constants';
import endpoints from '@/lib/constants/endpoints';
import type { VerifyOtpApiResponse } from '@/lib/types/ApiTypes';
import { useAppStore } from '@/store';

export default function OtpForm({ email }: { email: string }) {
  const updateAuthToken = useAppStore((store) => store.updateAuthToken);
  const updateUserInfoAfterLogin = useAppStore(
    (store) => store.updateUserInfoAfterLogin,
  );

  const router = useRouter();

  const formSchema = z.object({
    pin: z.string().min(5, {
      message: 'Your one-time password must be 5 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { mutate: verifyOtp, isPending: isPendingVerifyOtp } = useMutation<
    { data: VerifyOtpApiResponse },
    any,
    { username: string; code: number }
  >({
    mutationFn: (body) =>
      apiClient.post(`${appConfig.apiUrl}${endpoints.verifyOTP.url}`, body),
    onSuccess: (res) => {
      const { token, user } = res.data.data;
      updateAuthToken(token);
      updateUserInfoAfterLogin(user);
      toast.success(res.data.message);
      router.push('/');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.pin && +values.pin)
        verifyOtp({ username: email, code: +values.pin });
    } catch (error: any) {
      // toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-h2-bold'>Verification</h2>
        <p className='flex w-full flex-wrap gap-1 truncate text-par lg:max-w-[352px] xl:max-w-[452px]'>
          Please enter the verification code sent to
          <span className='font-medium'>{email}</span>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='pin'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-par-medium'>
                  Verification code
                </FormLabel>
                <FormControl>
                  <InputOTP autoFocus maxLength={5} {...field}>
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
          <div className='flex w-full gap-2'>
            <Button
              disabled={!!Object.keys(form.formState.errors).length}
              isLoading={isPendingVerifyOtp}
              size='lg'
              className='w-32 grow font-bold'
              type='submit'
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>{' '}
    </div>
  );
}
