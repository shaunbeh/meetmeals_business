import { Elements } from '@stripe/react-stripe-js';
import { type Appearance, type StripeElementsOptions } from '@stripe/stripe-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Layout from '@/components/Layout';
import CheckoutForm from '@/components/pages/homepage/CheckoutForm';
import OrderCard from '@/components/pages/homepage/OrderCard';
import OrderOptionsModal from '@/components/pages/homepage/orderOptions/OrderOptionsModal';
import { ProtectedRoute } from '@/components/protected-auth';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/axios';
import { appConfig } from '@/lib/constants';
import endpoints from '@/lib/constants/endpoints';
import getStripe from '@/lib/constants/getStripe';
import type {
  GetPlansApiResponse,
  SubmitOrderApiResponse,
} from '@/lib/types/ApiTypes';
import { PurchaseStepsEnum } from '@/lib/types/enums';
import { useAppStore } from '@/store';

export default function Home() {
  const enabled = useAppStore((store) => store.auth.isLoggedIn);

  // STATES
  const [stripeClientSecret, setStripeClientSecret] = useState<string>();
  const [purchaseStep, setPurchaseStep] = useState<
    PurchaseStepsEnum | undefined
  >(undefined);
  const [orderId, setOrderId] = useState<number>();
  const [orderNumber, setOrderNumber] = useState<number>();
  const [orderDate, setOrderDate] = useState<string>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMealOption, setSelectedMealOption] = useState<string>();
  const [selectedId, setSelectedId] = useState<number>();
  const handleDialogOpen = (id: number) => {
    setDialogOpen(true);
    setSelectedId(id);
  };

  // APIS
  const { data, isLoading } = useQuery<GetPlansApiResponse>({
    queryKey: [endpoints.getPlans.url],
    enabled,
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
      apiClient.post(`${appConfig.apiUrl}${endpoints.submitOrder.url}`, body),
    onSuccess: (res) => {
      setStripeClientSecret(res?.data?.data?.payment?.client_secret);
      setOrderId(res?.data?.data?.order?.id);
      setOrderNumber(res?.data?.data.order.id);
      setOrderDate(res?.data?.data.order.created_at);
      setPurchaseStep(PurchaseStepsEnum.Checkout);
    },
    onError: () => setDialogOpen(false),
  });

  // FUNCTIONS
  const handleSubmitOrder = () => {
    if (!selectedMealOption || !selectedId) return;
    submitOrder({
      organization_plan_option_id: +selectedMealOption,
      organization_plan_id: selectedId,
    });
  };
  const handlePurchaseStep = () => {
    setPurchaseStep(PurchaseStepsEnum.Checkout);
  };

  // STRIPE
  const stripe = getStripe();
  let options: StripeElementsOptions = {};
  let appearance: Appearance = {};
  if (stripeClientSecret) {
    appearance = {
      theme: 'flat',
      variables: {
        colorPrimary: '#ff0000',
        colorText: '#333',
      },
      rules: {
        '.Input': {
          color: '#333',
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
    <ProtectedRoute>
      <Layout title='Home'>
        <>
          <div className='mx-auto flex px-2 py-4 md:px-6'>
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
                    options={data.data.options}
                    setDialogOpen={handleDialogOpen}
                    plan={plan}
                    key={i}
                  />
                ))
              )}
            </div>
          </div>
          <OrderOptionsModal
            data={data}
            dialogOpen={dialogOpen}
            handleSubmitOrder={handleSubmitOrder}
            isPendingSubmitOrder={isPendingSubmitOrder}
            selectedMealOption={selectedMealOption}
            setDialogOpen={setDialogOpen}
            setSelectedMealOption={setSelectedMealOption}
          />
          <Dialog
            open={purchaseStep === PurchaseStepsEnum.Checkout}
            onOpenChange={handlePurchaseStep}
          >
            <DialogContent>
              {stripeClientSecret &&
                orderId &&
                orderNumber &&
                purchaseStep === PurchaseStepsEnum.Checkout && (
                  <Elements options={options} stripe={stripe}>
                    <CheckoutForm
                      clientSecret={stripeClientSecret}
                      handleBackClick={() =>
                        setPurchaseStep(PurchaseStepsEnum.Details)
                      }
                      orderId={orderId.toString()}
                      orderDate={orderDate}
                      // orderNumber={orderNumber.toString()}
                    />
                  </Elements>
                )}
            </DialogContent>
          </Dialog>
        </>
      </Layout>
    </ProtectedRoute>
  );
}
