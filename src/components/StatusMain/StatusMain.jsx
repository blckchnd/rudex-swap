import { useContext, useEffect } from 'react';
import { InfoContext } from '@components/utils/provider/InfoProvider';
import axiosRequest from '@components/utils/hooks/axiosRequestHook';
import StatusSection from './StatusSection/StatusSection';
import Features from '@components/Main/Features/Features';
import Questions from '@components/MainMoreRates/Questions/Questions';
import Products from '@components/Main/Products/Products';
import StartSwap from '@components/Main/StartSwap/StartSwap';
import { useLocation, useNavigate } from 'react-router-dom';

const StatusMain = ({ locales, currencies }) => {
  const {
    transactionId,
    handleUpdateExchangeProcess,
    handleUpdateTransactionId,
    exchangeProcess,
  } = useContext(InfoContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let timerId;
    if (transactionId) {
      timerId = setInterval(() => {
        checkStatus(transactionId);
      }, 5000);
    }
    return () => clearInterval(timerId);
  }, [transactionId]);

  useEffect(() => {
    if (location.state !== null) {
      handleUpdateExchangeProcess(location.state);
      handleUpdateTransactionId(location.state);
    } else {
      navigate('/');
    }
  }, []);

  const checkStatus = (id) => {
    axiosRequest({
      method: 'GET',
      url: 'tx',
      data: {
        id: id,
      },
      callback: handleUpdateExchangeProcess,
    });
  };

  return (
    <main className="main-page">
      <StatusSection
        locales={locales}
        exchangeProcess={exchangeProcess}
        currencies={currencies}
      />
      <Features locales={locales} />
      <StartSwap locales={locales} />
      <Products locales={locales} />
      <Questions locales={locales} />
    </main>
  );
};

export default StatusMain;
