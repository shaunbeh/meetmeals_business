import { ReloadIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import { Elements } from '@stripe/react-stripe-js';
import {
  type Appearance,
  loadStripe,
  type StripeElementsOptions,
} from '@stripe/stripe-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { Clock } from 'iconsax-react';
import { DateTime } from 'luxon';
import NonVegetarianIcon from 'public/images/svg/non-vegetarian.svg';
import VegetarianIcon from 'public/images/svg/vegetarian.svg';
import { useState } from 'react';

import CheckoutForm from '@/components/CheckoutForm';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { appConfig } from '@/lib/constants';
import endpoints from '@/lib/constants/endpoints';
import type {
  GetPlansApiResponse,
  PlanT,
  SubmitOrderApiResponse,
} from '@/lib/types/ApiTypes';
import { PurchaseStepsEnum } from '@/lib/types/enums';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

const OrderCard = ({
  plan,
  setDialogOpen,
}: {
  plan: PlanT;
  setDialogOpen: (id: number) => void;
}) => (
  <div
    className={clsx(
      'flex h-36 min-w-[640px] gap-4 rounded-lg bg-surface-secondary p-4',
      plan.can_order ? 'text-text-primary' : 'text-text-disabled',
    )}
  >
    <div className='flex size-[112px] flex-col items-center justify-center rounded-lg border border-line-primary p-2'>
      <div className='font-bold'>
        {DateTime.fromFormat(plan.date, 'yyyy-MM-dd').weekdayLong}
      </div>
      <div className='text-button-light'>28 June</div>
    </div>
    <div className='flex grow flex-col justify-between rounded-lg'>
      <div className='flex justify-between'>
        <div className='font-bold'>{plan.title}</div>
        <div className='flex items-center gap-1 font-bold'>
          <span
            className={
              plan.discounted_price
                ? 'text-text-disabled line-through'
                : 'text-h2-bold text-text-primary'
            }
          >
            {plan.price}€
          </span>
          {!!plan.discounted_price && (
            <span className='text-h2-bold'>{plan.discounted_price}€</span>
          )}
        </div>
      </div>
      <div className='flex h-8 items-center justify-between'>
        <div className='flex gap-1'>
          <Clock className='text-icon-primary' />
          <span>{`${plan.start_time} - ${plan.end_time}`}</span>
        </div>
        <Button
          disabled={!plan.can_order}
          onClick={() => setDialogOpen(plan.id)}
          variant='default'
          className='font-bold'
        >
          Place order
        </Button>
      </div>
    </div>
  </div>
);

export default function Home() {
  const { token, isLoggedIn } = useAppStore((store) => store.auth);

  const { data, isLoading } = useQuery<GetPlansApiResponse>({
    queryKey: [endpoints.getPlans.url, { token }],
    enabled: isLoggedIn,
  });

  // STATES
  const [stripeClientSecret, setStripeClientSecret] = useState<string>();
  const [purchaseStep, setPurchaseStep] = useState<
    PurchaseStepsEnum | undefined
  >(undefined);
  const [orderId, setOrderId] = useState<number>();
  const [orderNumber, setOrderNumber] = useState<number>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMealOption, setSelectedMealOption] = useState<string>();
  const [selectedId, setSelectedId] = useState<number>();
  const handleDialogOpen = (id: number) => {
    setDialogOpen(true);
    setSelectedId(id);
  };

  const mealOptionsContent = data?.data.options.map((el, key) => {
    const selected = el.id.toString() === selectedMealOption;
    return (
      <button
        key={key}
        className={clsx(
          'flex items-center space-x-2 space-y-2 rounded-lg border p-3 hover:text-primary',
          selected
            ? 'border-primary text-primary'
            : 'border-line-primary text-text-primary',
        )}
        onClick={() => setSelectedMealOption(el?.id.toString())}
      >
        <Label
          htmlFor={el?.title.toString()}
          className='flex grow cursor-pointer items-center gap-4'
        >
          {el.title.toLowerCase().includes('non') ? (
            <VegetarianIcon className='size-12' />
          ) : (
            <NonVegetarianIcon className='size-12' />
          )}
          <Separator
            orientation='vertical'
            className={cn(selected ? 'bg-primary' : '', 'h-16')}
          />
          <div className='flex flex-col gap-2'>
            <span className='text-start text-sub2-bold'>{el.title}</span>
            <span className='max-w-80 text-sub3'>{el.description}</span>
          </div>
        </Label>
        <RadioGroupItem value={el.id.toString()} id={el.id.toString()} />
      </button>
    );
  });

  const { mutate: submitOrder, isPending: isPendingSubmitOrder } = useMutation<
    { data: SubmitOrderApiResponse },
    any,
    {
      organization_plan_option_id: number;
      organization_plan_id: number;
    }
  >({
    mutationFn: (body) =>
      axios.post(`${appConfig.apiUrl}${endpoints.submitOrder.url}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: (res) => {
      setStripeClientSecret(res?.data?.data?.payment?.client_secret);
      setOrderId(res?.data?.data?.order?.id);
      setOrderNumber(res?.data?.data.order.id);
      setPurchaseStep(PurchaseStepsEnum.Checkout);
    },
  });

  const handleSubmitOrder = () => {
    if (!selectedMealOption || !selectedId) return;
    submitOrder({
      organization_plan_option_id: +selectedMealOption,
      organization_plan_id: selectedId,
    });
  };

  // STRIPE
  let options: StripeElementsOptions = {};
  let appearance: Appearance = {};
  if (stripeClientSecret) {
    appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#015248',
        colorText: '#eee',
      },
      rules: {
        '.Input': {
          color: '#222',
        },
        '.RedirectText': {
          padding: '1rem',
        },
      },
    };
    options = {
      clientSecret: stripeClientSecret,
      appearance,
      locale: 'en',
    };
  }

  return (
    <>
      <Layout title='Home'>
        <div className='mx-auto flex px-6 py-4'>
          <div className='hidden h-full w-1/3 flex-col lg:flex' />
          <div className='flex flex-col items-center justify-center gap-5' />
          <div className='flex flex-col gap-4'>
            {isLoading ? (
              <>
                <Skeleton className='h-36 w-[640px]' />
                <Skeleton className='h-36 w-[640px]' />
                <Skeleton className='h-36 w-[640px]' />
                <Skeleton className='h-36 w-[640px]' />
                <Skeleton className='h-36 w-[640px]' />
              </>
            ) : (
              data?.data.plans.map((plan, i) => (
                <OrderCard
                  setDialogOpen={handleDialogOpen}
                  plan={plan}
                  key={i}
                />
              ))
            )}
          </div>
        </div>
      </Layout>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-[510px]'>
          <DialogHeader className='gap-6'>
            <DialogTitle className='text-center'>Place order</DialogTitle>
            <DialogDescription>
              You can choose from the options below based on your dietary
              preferences. To facilitate your selection, the ingredients for
              your chosen meal are listed.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <RadioGroup value={selectedMealOption}>
              {mealOptionsContent}
            </RadioGroup>
          </div>
          <DialogFooter className='flex items-center gap-2'>
            <Button
              onClick={() => setDialogOpen(false)}
              variant='outline'
              className='h-12 grow'
            >
              Close
            </Button>
            <Button
              onClick={handleSubmitOrder}
              className='h-12 grow'
              type='submit'
              disabled={isPendingSubmitOrder || !selectedMealOption}
            >
              <div className='flex w-20 items-center justify-center'>
                {isPendingSubmitOrder ? (
                  <ReloadIcon className='animate-spin' />
                ) : (
                  'Order now'
                )}
              </div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {purchaseStep === PurchaseStepsEnum.Checkout &&
      stripeClientSecret &&
      orderId &&
      orderNumber ? (
        <Elements
          options={options}
          stripe={loadStripe(
            `pk_live_51N5uHZFa1yeduLXlmxW4yi3QVytXJX7eV5tXzwNFnAXRGtiyp9YxOhBG0m502chZNUT4JQJkmFkUhD2xeaE2A4X600m6oOHA3y`,
          )}
        >
          <CheckoutForm
            clientSecret={stripeClientSecret}
            handleBackClick={() => setPurchaseStep(PurchaseStepsEnum.Details)}
            orderId={orderId.toString()}
            orderNumber={orderNumber.toString()}
          />
        </Elements>
      ) : null}
    </>
  );
}
