import { useEffect, useState } from 'react';

export default function CountDown({
  interval,
  callback,
}: {
  interval: number;
  callback: () => void;
}) {
  const [seconds, setSeconds] = useState(interval);
  useEffect(() => {
    const localInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        callback();
        setSeconds(59);
      }
    }, 1000);
    return () => clearInterval(localInterval);
  }, [callback, seconds]);

  return <div className='w-5 text-end'>{seconds}</div>;
}
