import type { Stripe } from "@stripe/stripe-js";

const params: Stripe.Checkout.SessionCreateParams = {
  submit_type: 'donate',
  payment_method_types: ['card'],
  line_items: [
    {
      name: 'Custom amount',
      amount: formatAmountForStripe(amount,CURRENCY)
      currency: CURRENCY,
      quantity: 1
    }
  ]
}