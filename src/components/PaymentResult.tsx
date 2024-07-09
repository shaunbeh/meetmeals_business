import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { useStripe } from '@stripe/react-stripe-js';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoadingOverlay from './LoadingOverlay';
import { Button } from './ui/button';

function PaymentResult() {
  const [isLoading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const stripe = useStripe();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const paymentIntentClientSecret = params.get(
      'payment_intent_client_secret',
    );
    setOrderId(params.get('order-id') ?? '');
    setOrderNumber(params.get('order-number') ?? '');

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
  }, [params, stripe]);

  const isSuccessful = paymentStatus === 'payment.succeeded';

  const navigateToExplore = () => {
    router.push('/');
  };

  const handleViewOrder = () => {
    if (isSuccessful) {
      router.push(`/?order-id=${orderId}`);
    } else {
      navigateToExplore();
    }
  };

  return (
    <Dialog open onOpenChange={navigateToExplore}>
      <DialogContent className='mx-auto h-screen max-h-[690px] max-w-sm overflow-y-auto rounded-lg md:max-h-[730px] md:max-w-md [&>button>svg]:text-text-primary'>
        {isLoading ? (
          <LoadingOverlay />
        ) : (
          <div className='flex flex-col justify-between gap-2 rounded-lg border border-line-primary bg-surface-secondary px-10 py-6'>
            <div className='flex flex-col gap-4 text-text-primary'>
              <Image
                className='size-full object-cover'
                alt='Follow your order'
                src={
                  isSuccessful
                    ? '/images/success-payment.png'
                    : '/images/failure-payment.svg'
                }
              />
              <div>
                <p className='mb-2 text-center text-lg font-bold'>
                  Your order is confirmed!
                </p>
                <div className='mx-auto w-fit rounded-lg border border-dotted p-2 font-medium'>
                  {`Invoice number: ${orderNumber}`}
                </div>
              </div>
              <p className='mb-2 px-8 py-6 text-center font-medium'>
                {isSuccessful
                  ? 'Your order for Tuesday has been placed and will be delivered to the office between 12:00-13:00.'
                  : 'The transaction could not be completed. Please try again in a few minutes.'}
              </p>
            </div>
            <div className='mb-2 flex justify-center gap-4'>
              <Button
                type='button'
                className='h-12 w-full !pe-4'
                onClick={handleViewOrder}
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

export default PaymentResult;
