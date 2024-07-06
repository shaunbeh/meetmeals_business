import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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
import { appConfig } from '@/lib/constants';
import endpoints from '@/lib/constants/endpoints';
import type { VerifyOtpApiResponse } from '@/lib/types/ApiTypes';
import { useAppStore } from '@/store';

export default function OtpForm({ email }: { email: string }) {
  const { updateUserInfoAfterLogin } = useAppStore();
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
      axios.post(`${appConfig.apiUrl}${endpoints.verifyOTP.url}`, body),
    onSuccess: (res) => {
      const { user, token } = res.data.data;
      updateUserInfoAfterLogin({
        email: user.email,
        fName: user.fName,
        id: user.id,
        lName: user.lName,
        mobile: user.mobile,
        organization_id: user.organization_id,
        post_code: user.post_code,
        privilege: user.privilege,
        user_code: user.user_code,
        userImage: user.userImage,
        username: user.username,
        verified: user.verified,
        token,
      });
      toast.success(res.data.message, {
        position: 'top-right',
        style: { color: 'green' },
      });
      router.push('/');
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.pin && +values.pin)
        await verifyOtp({ username: email, code: +values.pin });
    } catch (error: any) {
      // toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-h2-bold'>Verification</h2>
        <p className='flex w-full max-w-[452px] flex-wrap gap-1 truncate text-par'>
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
          <div className='flex w-full gap-2'>
            <Button
              disabled={
                !!Object.keys(form.formState.errors).length ||
                isPendingVerifyOtp
              }
              size='lg'
              className='w-32 grow font-bold'
              type='submit'
            >
              {isPendingVerifyOtp ? (
                <ReloadIcon className='animate-spin' />
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
