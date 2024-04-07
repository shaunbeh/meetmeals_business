import { type ClassValue, clsx } from 'clsx';
import DOMPurify from 'isomorphic-dompurify';
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

export const fetchContent = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.text();
  } catch (error) {
    console.error('Error fetching content:', error);
    return ''; // Return an empty string in case of an error
  }
};

export const fetchJson = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return ''; // Return an empty string in case of an error
  }
};

export async function fetchHeaderFooterData() {
  const [header, footer] = await Promise.all([
    fetchContent(
      'https://clinicsarmayeh.com/wp-json/custom-section/v1/header/'
    ),
    fetchContent(
      'https://clinicsarmayeh.com/wp-json/custom-section/v1/footer/'
    ),
  ]);

  const headerContent = DOMPurify.sanitize(header);
  const footerContent = DOMPurify.sanitize(footer);

  return {
    layoutProps: {
      headerContent,
      footerContent,
    },
  };
}
