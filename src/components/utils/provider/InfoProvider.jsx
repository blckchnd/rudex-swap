import { createContext, useState } from 'react';

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [popupActive, setPopupActive] = useState(false);
  const [exchange, setExchange] = useState(null);
  const [exchangeProcess, setExchangeProcess] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const [amountSendCurrency, setAmountSendCurrency] = useState(0);
  const [amountResiveCurrency, setAmountResiveCurrency] = useState(0);
  const [typeSendCurrency, setTypeSendCurrency] = useState({
    value: 'btc',
    label: 'BTC',
  });
  const [typeResiveCurrency, setTypeResiveCurrency] = useState({
    value: 'usdt',
    label: 'USDT',
  });

  const handleClickPopupActive = () => {
    setPopupActive(!popupActive);
  };

  const handleClickPopupExchange = (props) => {
    setExchange(props);
  };

  const handleUpdateExchangeProcess = (props) => {
    setExchangeProcess(props);
  };

  const handleUpdateTransactionId = (props) => {
    setTransactionId(props?.transaction?.id);
  };

  return (
    <InfoContext.Provider
      value={{
        exchange,
        popupActive,
        exchangeProcess,
        transactionId,
        amountSendCurrency,
        amountResiveCurrency,
        typeSendCurrency,
        typeResiveCurrency,
        handleClickPopupActive,
        handleClickPopupExchange,
        handleUpdateExchangeProcess,
        handleUpdateTransactionId,
        setAmountSendCurrency,
        setAmountResiveCurrency,
        setTypeSendCurrency,
        setTypeResiveCurrency,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
