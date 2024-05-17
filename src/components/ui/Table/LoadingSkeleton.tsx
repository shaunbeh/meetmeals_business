/* eslint-disable jsx-a11y/control-has-associated-label */
import { Skeleton } from '../skeleton';

export default function LoadingSkeleton() {
  return (
    <div className='py-4'>
      <div className='custom-scroll overflow-x-auto'>
        <table className='w-full table-auto rounded-lg border border-gray-200'>
          <thead>
            <tr>
              <th className='px-4 py-2.5' />
              <th className='px-4 py-2.5'>
                <Skeleton className='h-[20px] w-[100px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='h-[20px] w-[100px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='h-[20px] w-[100px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='h-[20px] w-[100px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='h-[20px] w-[100px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='h-[20px] w-[100px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='h-[20px] w-[100px]' />
              </th>
              <th className='px-4 py-2.5'>
                <Skeleton className='h-[20px] w-[100px]' />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr className='border-b' key={i}>
                <td className='px-4  py-2.5'>
                  <Skeleton className='size-[25px] rounded-full' />
                </td>
                <td className='px-4  py-5'>
                  <Skeleton className='h-[25px] w-[100px]' />
                </td>
                <td className='px-4  py-5'>
                  <Skeleton className='h-[25px] w-[100px]' />
                </td>
                <td className='px-4  py-5'>
                  <Skeleton className='h-[25px] w-[100px]' />
                </td>
                <td className='px-4  py-5'>
                  <Skeleton className='h-[25px] w-[100px]' />
                </td>
                <td className='px-4  py-5'>
                  <Skeleton className='h-[25px] w-[100px]' />
                </td>
                <td className='px-4  py-5'>
                  <Skeleton className='h-[25px] w-[100px]' />
                </td>
                <td className='px-4  py-5'>
                  <Skeleton className='h-[25px] w-[100px]' />
                </td>
                <td className='px-4  py-5'>
                  <Skeleton className='h-[25px] w-[100px]' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
