import { SearchNormal1 } from 'iconsax-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function BrokersSideMenu() {
  return (
    <div className='flex flex-col gap-8 px-2'>
      <div className='relative grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='search'>Brokers</Label>
        <Input
          type='search'
          id='search'
          placeholder='Search brokers'
          className='w-11/12 rounded-none ps-10'
        />
        <SearchNormal1 className='absolute left-2 top-7 size-4' />
      </div>
      <div className='relative grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='countries'>Accept Clients From</Label>
        <Select>
          <SelectTrigger className='w-11/12'>
            <SelectValue placeholder='All Countries/Regions' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>All Countries/Regions</SelectLabel>
              <SelectItem value='est'>Afghanistan</SelectItem>
              <SelectItem value='cst'>Aland Islands</SelectItem>
              <SelectItem value='mst'>Albania</SelectItem>
              <SelectItem value='pst'>Algeria</SelectItem>
              <SelectItem value='akst'>American Samoa</SelectItem>
              <SelectItem value='hst'>Andora</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
