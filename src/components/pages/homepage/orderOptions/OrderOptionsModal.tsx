import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup } from '@/components/ui/radio-group';
import type { GetPlansApiResponse } from '@/lib/types/ApiTypes';

import MealOptionsContent from './Content';

const OrderOptionsModal = ({
  dialogOpen,
  setDialogOpen,
  selectedMealOption,
  handleSubmitOrder,
  isPendingSubmitOrder,
  data,
  setSelectedMealOption,
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  handleSubmitOrder: () => void;
  isPendingSubmitOrder: boolean;
  data?: GetPlansApiResponse;
  selectedMealOption?: string;
  setSelectedMealOption: (option: string) => void;
}) => (
  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogContent className='sm:max-w-[520px]'>
      <DialogHeader className='gap-6'>
        <DialogTitle className='text-center'>Place order</DialogTitle>
        <DialogDescription>
          You can choose from the options below based on your dietary
          preferences. To facilitate your selection, the ingredients for your
          chosen meal are listed.
        </DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <RadioGroup value={selectedMealOption}>
          <MealOptionsContent
            data={data}
            selectedMealOption={selectedMealOption}
            setSelectedMealOption={setSelectedMealOption}
          />
        </RadioGroup>
      </div>
      <DialogFooter className='flex items-center gap-2'>
        <Button
          onClick={() => setDialogOpen(false)}
          variant='outline'
          className='h-12 w-full sm:w-auto sm:grow'
        >
          Close
        </Button>
        <Button
          onClick={handleSubmitOrder}
          className='h-12 w-full sm:w-auto sm:grow'
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
);

export default OrderOptionsModal;
