import type { Stripe } from '@stripe/stripe-js';
import type { NextPage } from 'next';
import type { FormEvent } from 'react';

import getStripe from '@/lib/constants/stripe';

import CheckoutForm from '../components/CheckoutForm';
import Layout from './Layout';

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  // Create a Checkout Session.
  const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
    '/api/checkout_sessions',
    { amount: input.customDonation },
  );

  if ((checkoutSession as any).statusCode === 500) {
    console.error((checkoutSession as any).message);
    return;
  }

  // Redirect to Checkout.
  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout({
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as parameter here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    sessionId: checkoutSession.id,
  });
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
  console.warn(error.message);
};

const DonatePage: NextPage = () => (
  <Layout title='Donate with Checkout | Next.js + TypeScript Example'>
    <div className='page-container'>
      <h1>Donate with Checkout</h1>
      <p>Donate to our project 💖</p>
      <CheckoutForm />
    </div>
  </Layout>
);

export default DonatePage;
