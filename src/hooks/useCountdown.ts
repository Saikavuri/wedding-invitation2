import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(targetDate: string): CountdownTime {
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000)
      });
    };

    calculateTime(); // run once immediately
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}
