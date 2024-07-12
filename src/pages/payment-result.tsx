import { Elements, useStripe } from '@stripe/react-stripe-js';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ProtectedRoute } from '@/components/protected-auth';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import getStripe from '@/lib/constants/getStripe';

function PaymentResult() {
  const [isLoading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('');
  // const [orderDate, setOrderDate] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const stripe = useStripe();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentIntentClientSecret = searchParams.get(
      'payment_intent_client_secret',
    );
    // setOrderDate(searchParams.get('order-date') ?? '');
    setOrderNumber(searchParams.get('order-number') ?? '');

    if (paymentIntentClientSecret) {
      if (!stripe) {
        return;
      }
      stripe
        .retrievePaymentIntent(paymentIntentClientSecret)
        .then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case 'succeeded':
              setPaymentStatus('payment.succeeded');
              break;
            case 'processing':
              setPaymentStatus('payment.processing');
              break;
            case 'requires_payment_method':
              setPaymentStatus('payment.requiresPaymentMethod');
              break;
            default:
              setPaymentStatus('payment.Failed');
              break;
          }
          setLoading(false);
        });
    } else {
      setPaymentStatus('payment.unknownStatus');
      setLoading(false);
    }
  }, [searchParams, stripe]);

  const navigateToHome = () => {
    router.push('/');
  };
  const isSuccessful = paymentStatus === 'payment.succeeded';

  return (
    <Dialog open onOpenChange={navigateToHome}>
      <DialogContent className='mx-auto h-screen max-h-[690px] max-w-sm overflow-y-auto rounded-lg md:max-h-[730px] md:max-w-md [&>button>svg]:text-text-primary'>
        {isLoading ? (
          <LoadingOverlay />
        ) : (
          <div className='flex flex-col justify-between gap-2 rounded-lg border border-line-primary bg-surface-secondary px-10 py-6'>
            <div className='flex flex-col gap-4 text-text-primary'>
              <Image
                className='size-full object-cover'
                alt='Follow your order'
                width={200}
                height={200}
                src={
                  isSuccessful
                    ? '/images/success-payment.png'
                    : '/images/failure-payment.svg'
                }
              />
              <div>
                <p className='mb-2 text-center text-lg font-bold'>
                  {/* {t(paymentStatus)} */}
                </p>
                <div className='mx-auto w-fit rounded-lg border border-dotted p-2 font-medium'>
                  {`Order number: ${orderNumber}`}
                </div>
              </div>
              {/* <p className='mb-2 px-8 py-6 text-center font-medium'>
                {isSuccessful
                  ? t('payment.successDesc')
                  : t('payment.failureDesc')}
              </p> */}
            </div>
            <div className='mb-2 flex justify-center gap-4'>
              <Button
                type='button'
                className='h-12 w-full !pe-4'
                onClick={navigateToHome}
                disabled={isLoading}
              >
                Back to home
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function PaymentResultPage() {
  const stripe = getStripe();
  return (
    <ProtectedRoute>
      <Elements stripe={stripe}>
        <PaymentResult />
      </Elements>
    </ProtectedRoute>
  );
}
