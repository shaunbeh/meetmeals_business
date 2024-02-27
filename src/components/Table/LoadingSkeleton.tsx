import { Skeleton } from '../ui/skeleton';

export default function LoadingSkeleton() {
  return (
    <div className='mt-4'>
      <div className='overflow-x-auto custom-scroll'>
        <table className='w-full rounded-lg border border-gray-200 table-auto'>
          <thead>
            <tr>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[100px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[200px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[100px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[100px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[100px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[100px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[100px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[100px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='w-[100px] h-[20px]' />
              </th>
              <th className='px-4 py-2.5'></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr className='border-b' key={i}>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[100px] h-[25px]' />
                </td>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[200px] h-[25px]' />
                </td>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[100px] h-[25px]' />
                </td>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[100px] h-[25px]' />
                </td>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[100px] h-[25px]' />
                </td>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[100px] h-[25px]' />
                </td>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[100px] h-[25px]' />
                </td>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[100px] h-[25px]' />
                </td>
                <td className='px-4 py-5'>
                  <Skeleton className='w-[100px] h-[25px]' />
                </td>
                <td className='px-4 py-2.5'>
                  <Skeleton className='w-[25px] h-[25px] rounded-full' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
