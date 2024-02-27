import { useEffect, useState } from 'react';

const useWordPressHeaderFooter = (url: string) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const fetchHeaderFooter = async () => {
      const response = await fetch(url);
      const data = await response.text();
      setHtml(data);
    };

    fetchHeaderFooter();
  }, [url]);

  return { __html: html };
};

export default useWordPressHeaderFooter;
