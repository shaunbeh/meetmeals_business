import { Select } from '@/components/ui/select';
import endpoints from '@/lib/endpoints';
import { GetExchangePricesResultApi } from '@/lib/schema/ApiTypes';
import { useQuery } from '@tanstack/react-query';

export default function Comparison() {
  const { data: coinList } = useQuery<GetExchangePricesResultApi>({
    queryKey: [
      endpoints.exchanges.url,
      {
        method: endpoints.exchanges.method,
      },
    ],
  });

  console.log();

  return (
    <div>
      <h2>مقایسه قیمت خرید و فروش در صرافی های ارزدیجیتال</h2>
      <div className='flex'>
        {coinList?.data?.[0].symbols?.map((el) => el.symbol)}
        <Select open />
        {/* <Image */}

        <div className='flex flex-col'></div>
      </div>
    </div>
  );
}
