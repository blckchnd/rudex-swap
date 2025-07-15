import './status-section.scss';
import StatusTransaction from './StatusTransaction/StatusTransaction';
import StatusSuccess from './StatusSuccess/StatusSuccess';
import { STATUS } from '../constant';
import { useEffect, useState } from 'react';
import { checkCurrencies } from '@components/utils/utils';

const StatusSection = ({ locales, exchangeProcess, currencies }) => {
  const [fromCur, setFromCur] = useState({
    label: '',
    network: '',
  });
  const [toCur, setToCur] = useState({
    label: '',
    network: '',
  });

  useEffect(() => {
    if (currencies) {
      currencies.map((item) => {
        if (
          item?.ticker?.toUpperCase() ===
          exchangeProcess?.transaction?.from?.toUpperCase()
        ) {
          setFromCur(checkCurrencies(item));
        }
        if (
          item?.ticker?.toUpperCase() ===
          exchangeProcess?.transaction?.to?.toUpperCase()
        ) {
          setToCur(checkCurrencies(item));
        }
      });
    }
  }, [currencies, exchangeProcess]);

  return (
    <section className="status-section">
      <h2 className="status-section__title">
        {locales?.STATUS_TRANSACTION?.TITLE}
      </h2>
      {exchangeProcess?.transaction?.status !== STATUS.FINISHED && (
        <StatusTransaction
          locales={locales}
          exchangeProcess={exchangeProcess}
          toCur={toCur}
          fromCur={fromCur}
        />
      )}
      {exchangeProcess?.transaction?.status === STATUS.FINISHED && (
        <StatusSuccess
          locales={locales}
          exchangeProcess={exchangeProcess}
          toCur={toCur}
          fromCur={fromCur}
        />
      )}
    </section>
  );
};

export default StatusSection;
