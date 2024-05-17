import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const roundDecimalDigits = (num: number | string, precision: number) => {
  // if(num!=0 && num!='0'){
  const pre = 10 ** precision;
  let res = Math.round((+num + Number.EPSILON) * pre) / pre;
  if (res === 0) {
    res = Math.abs(res);
  }
  return res;
};
export const roundDecimalDigitsExact = (
  num: number | string,
  precision: number,
) => {
  // if(num!=0 && num!='0'){
  const pre = 10 ** precision;
  let res = Math.round((+num + Number.EPSILON) * pre) / pre;
  if (res === 0) {
    res = Math.abs(res);
  }
  return res.toLocaleString(undefined, { minimumFractionDigits: precision });
};

export const fetchContent = async (url: string) => {
  try {
    const res = await fetch(url);
    return await res.text();
  } catch (error) {
    return ''; // Return an empty string in case of an error
  }
};

export const fetchJson = async (url: string) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    return ''; // Return an empty string in case of an error
  }
};

export const getTextColorClass = (level: string) => {
  switch (level) {
    case '1':
      return 'text-level1-foreground';
    case '2':
      return '';
    default:
      return '';
  }
};
