import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { type FormEvent, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { appConfig } from '@/lib/constants';
import endpoints from '@/lib/constants/endpoints';
import type { GetUserInfoApiResponse } from '@/lib/types/ApiTypes';
import { useAppStore } from '@/store';

type CheckoutFormProps = {
  clientSecret: string;
  handleBackClick: () => void;
  orderId: string;
  // orderNumber: string;
  orderDate?: string;
};

function CheckoutForm(props: CheckoutFormProps) {
  const { isLoggedIn } = useAppStore((store) => store.auth);
  const stripe = useStripe();
  const elements = useElements();

  const [, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { data: userInfo } = useQuery<GetUserInfoApiResponse>({
    queryKey: [endpoints.getUserInfo.url],
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!props.clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(props.clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [props.clientSecret, stripe]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${appConfig.baseUrl}/?order-id=${props.orderId}&order-date=${props.orderDate}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || '');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setLoading(false);
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
    defaultValues: {
      billingDetails: {
        name: `${userInfo?.data.first_name} ${userInfo?.data.last_name}`,
      },
    },
  };

  return (
    <div>
      <form id='payment-form' className='gap-4' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' options={paymentElementOptions} />
        <div className='mt-6 flex items-center justify-center gap-5'>
          <Button
            variant='outline'
            className='grow'
            id='back'
            onClick={props.handleBackClick}
          >
            <span id='button-back' className='flex items-center justify-center'>
              Back
            </span>
          </Button>
          <Button
            variant='default'
            className='grow'
            disabled={isLoading || !stripe || !elements}
            id='submit'
          >
            <span id='button-text' className='flex items-center justify-center'>
              {isLoading ? <LoadingSpinner /> : 'Pay Now'}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
