import { Elements, useStripe } from '@stripe/react-stripe-js';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import FailureImage from 'public/images/failure-payment.svg';
import { useEffect, useState } from 'react';

import { ProtectedRoute } from '@/components/protected-auth';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import {
  PaymentCallbackParams,
  PaymentStatusEnum,
} from '@/lib/constants/enums';
import getStripe from '@/lib/constants/getStripe';

import SuccessImage from '../../public/images/success-payment.png';

function PaymentResult() {
  const [isLoading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('');

  const stripe = useStripe();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentIntentClientSecret = searchParams.get(
      'payment_intent_client_secret',
    );

    if (paymentIntentClientSecret) {
      if (!stripe) {
        return;
      }
      stripe
        .retrievePaymentIntent(paymentIntentClientSecret)
        .then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case 'succeeded':
              setPaymentStatus(PaymentStatusEnum.Succeeded);
              break;
            case 'processing':
              setPaymentStatus(PaymentStatusEnum.Processing);
              break;
            case 'requires_payment_method':
              setPaymentStatus(PaymentStatusEnum.RequiresPaymentMethod);
              break;
            default:
              setPaymentStatus(PaymentStatusEnum.Failed);
              break;
          }
          setLoading(false);
        });
    } else {
      setPaymentStatus(PaymentStatusEnum.Unknown);
      setLoading(false);
    }
  }, [searchParams, stripe]);

  const navigateToHome = () => {
    router.push('/');
  };

  // CONSTANTS
  const isSuccessful = paymentStatus === PaymentStatusEnum.Succeeded;

  const orderNumber = searchParams.get(PaymentCallbackParams.orderNumber);
  const paramsDeliveryDate = searchParams.get(
    PaymentCallbackParams.deliveryDate,
  );
  const paramsDeliveryStart = searchParams.get(
    PaymentCallbackParams.deliveryStart,
  );
  const paramsDeliveryEnd = searchParams.get(PaymentCallbackParams.deliveryEnd);

  const deliveryDate = DateTime.fromFormat(
    paramsDeliveryDate ?? '',
    'yyyy-MM-dd',
  );

  return (
    <Dialog open onOpenChange={navigateToHome}>
      <DialogContent className='mx-auto h-screen max-h-[665px] max-w-sm overflow-y-auto rounded-lg md:max-h-[700px] [&>button>svg]:text-text-primary'>
        {isLoading || paymentStatus === PaymentStatusEnum.Unknown ? (
          <LoadingOverlay />
        ) : (
          <div className='flex flex-col justify-between gap-2 rounded-lg border border-line-primary bg-surface-secondary px-10 py-6'>
            <div className='flex flex-col gap-4 text-text-primary'>
              {isSuccessful ? (
                <Image
                  className='size-full object-cover'
                  alt='Follow your order'
                  width={200}
                  height={200}
                  src={SuccessImage}
                />
              ) : (
                <FailureImage className='w-full' />
              )}
              <div>
                <p className='mb-2 text-center text-lg font-bold'>
                  {isSuccessful ? 'Your order is confirmed!' : 'Payment Error'}
                </p>
                <div className='mx-auto w-fit rounded-lg border border-dotted p-2 font-medium'>
                  {`Invoice number: ${orderNumber}`}
                </div>
              </div>
              <p className='mb-2 px-4 py-3 text-center font-medium md:px-8 md:py-6'>
                {isSuccessful ? (
                  <div>
                    Your order{' '}
                    {deliveryDate.weekdayLong && (
                      <>
                        for{' '}
                        <span className='font-bold'>
                          {deliveryDate.weekdayLong}
                        </span>
                      </>
                    )}{' '}
                    has been placed and will be delivered to the office{' '}
                    {paramsDeliveryStart && paramsDeliveryEnd ? (
                      <>
                        between{' '}
                        <span>{`${paramsDeliveryStart} - ${paramsDeliveryEnd}`}</span>
                      </>
                    ) : (
                      '.'
                    )}{' '}
                  </div>
                ) : (
                  'The transaction could not be completed. Please try again in a few minutes.'
                )}
              </p>
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
