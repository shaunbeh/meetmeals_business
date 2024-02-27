import { useState, useEffect } from 'react';
const useDebounce = (initial: string) => {
  const [searchText, setSearchText] = useState(initial);
  const [debouncedText, setDebouncedInputValue] = useState(initial);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchText);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  return { searchText, debouncedText, setSearchText };
};
export default useDebounce;
