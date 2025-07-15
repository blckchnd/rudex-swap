import { useEffect, useState } from 'react';
import { getTime } from '@components/utils/utils';

const StatusInfoTimer = ({ text, payTill }) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (payTill) {
      const interval = setInterval(() => {
        const time = Date.parse(payTill) - Date.now();

        if (time >= 0) {
          setTimer(getTime(time));
        } else {
          setTimer(null);
        }
      });
      return () => clearInterval(interval);
    }
  }, [payTill]);

  return timer ? (
    <span className={'status-info__timer'}>{timer}</span>
  ) : (
    <span className={'status-info__timer'}>{text}</span>
  );
};

export default StatusInfoTimer;
