import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const roundDecimalDigits = (num: number | string, precision: number) => {
  // if(num!=0 && num!='0'){
  const pre = 10 ** precision;
  let res = Math.round((+num + Number.EPSILON) * pre) / pre;
  if (res == 0) {
    res = Math.abs(res);
  }
  return res;
};
export const roundDecimalDigitsExact = (
  num: number | string,
  precision: number
) => {
  // if(num!=0 && num!='0'){
  const pre = 10 ** precision;
  let res = Math.round((+num + Number.EPSILON) * pre) / pre;
  if (res == 0) {
    res = Math.abs(res);
  }
  return res.toLocaleString(undefined, { minimumFractionDigits: precision });
};
