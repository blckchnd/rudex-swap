import './swap-currencies.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import axiosRequest from '@components/utils/hooks/axiosRequestHook';

import SwapCurrency from './SwapCurrency/SwapCurrency';
import SwapCurrencyButton from './SwapCurrencyButton/SwapCurrencyButton';
import SwapRates from './SwapRates/SwapRates';
import { InfoContext } from '@components/utils/provider/InfoProvider';
import { localiztionHelper } from '@components/utils/utils';
import classNames from 'classnames';

const SwapCurrencies = ({ locales, currencies, sectionWidget = false }) => {
  const controllerRef = useRef();
  const {
    popupActive,
    amountSendCurrency,
    amountResiveCurrency,
    typeSendCurrency,
    typeResiveCurrency,
    setAmountResiveCurrency,
    setAmountSendCurrency,
    setTypeResiveCurrency,
    setTypeSendCurrency,
  } = useContext(InfoContext);

  const [ratePartners, setRatePartners] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currencies.length > 0) {
      const btc = currencies?.find((item) => item?.ticker === 'btc') || null;
      const eth = currencies?.find((item) => item?.ticker === 'usdt') || null;
      setTypeSendCurrency({
        value: typeSendCurrency.value || btc?.ticker,
        label: typeSendCurrency.label || btc?.ticker.toUpperCase(),
      });
      setTypeResiveCurrency({
        value: typeResiveCurrency.value || eth?.ticker,
        label: typeResiveCurrency.label || eth?.ticker.toUpperCase(),
      });

      if (amountSendCurrency === 0) {
        setAmountSendCurrency(btc?.defaultAmount);
      }
    }
  }, [currencies]);

  const changeSendCurrency = (evt) => {
    setTypeSendCurrency({
      value: evt?.value,
      label: evt?.label,
    });
    const ticker = currencies?.find((item) => item?.ticker === evt?.value);
    setAmountSendCurrency(ticker?.defaultAmount);
  };

  const changeReciveCurrency = (evt) => {
    setTypeResiveCurrency({
      value: evt?.value,
      label: evt?.label,
    });
  };

  const changeCurrencyInput = (validValue) => {
    const parts = validValue.split('.');

    if (parts.length > 2) {
      setAmountSendCurrency(parts[0] + '.' + parts[1]);
    } else if (validValue === '') {
      setAmountSendCurrency(0);
    } else {
      setAmountSendCurrency(validValue);
    }
  };

  const handleCurrencyInput = (evt) => {
    const validValue = evt.target.value.replace(/[^0-9.]/g, '');

    if (
      validValue.length > 1 &&
      validValue[0] === '0' &&
      validValue[1] !== '.'
    ) {
      changeCurrencyInput(validValue.slice(1));
    } else {
      changeCurrencyInput(validValue);
    }
  };

  const changeAmountReciveCurrency = (data) => {
    setLoading(false);
    setRatePartners(data);

    if (data?.error) {
      if (data?.minAmount) {
        setError(data?.minAmount);
      } else {
        setError(null);
      }
      setAmountResiveCurrency('');
    } else if (data.length > 1) {
      setAmountResiveCurrency(data[0]?.amountTo);
    } else {
      setAmountResiveCurrency(data?.amountTo);
    }
  };

  const handleClickSwapCurrency = () => {
    setTypeSendCurrency(typeResiveCurrency);
    setTypeResiveCurrency(typeSendCurrency);
  };

  const getRate = () => {
    const controller = new AbortController();
    controllerRef.current = controller;

    if (amountSendCurrency > 0) {
      setLoading(true);

      axiosRequest({
        method: 'GET',
        url: 'get-rate',
        data: {
          from: typeSendCurrency?.value,
          to: typeResiveCurrency?.value,
          amount: amountSendCurrency,
          ofcAdapter: true,
          chooseRate: 'all',
          rateType: 'all',
        },
        signal: controller.signal,
        callback: changeAmountReciveCurrency,
      });

      return () => {
        if (controller) {
          controller.abort();
        }
      };
    }
  };

  useEffect(() => {
    const abortRequest = getRate();
    return () => {
      if (abortRequest) abortRequest();
    };
  }, [amountSendCurrency, typeSendCurrency, typeResiveCurrency]);

  useEffect(() => {
    if (!popupActive) {
      getRate();
    }
  }, [popupActive]);

  const swapCurrenciesClass = classNames('swap-currencies', {
    'swap-currencies__static': sectionWidget,
  });

  return (
    <div className={swapCurrenciesClass}>
      <div className="swap-currencies__wrapper">
        <h3 className="swap-currencies__title">{locales.SWAP_WIDGET.TITLE}</h3>
        <div className="swap-currencies__container">
          <SwapCurrency
            currencies={currencies}
            method={locales.SWAP_WIDGET.SEND}
            id={'currencySent'}
            currencyState={typeSendCurrency}
            changeCurrencySelect={changeSendCurrency}
            amountCurrency={amountSendCurrency}
            handleCurrencyInput={handleCurrencyInput}
            loading={false}
            disabledSelect={false}
            locales={locales}
          />
          <SwapCurrency
            currencies={currencies}
            method={locales.SWAP_WIDGET.RECIVE}
            id={'currencyResive'}
            currencyState={typeResiveCurrency}
            changeCurrencySelect={changeReciveCurrency}
            disabledInput={true}
            amountCurrency={amountResiveCurrency}
            handleCurrencyInput={() => null}
            loading={loading}
            disabledSelect={false}
            locales={locales}
          />
          <SwapCurrencyButton handleClickButton={handleClickSwapCurrency} />
        </div>
      </div>

      {amountResiveCurrency ? (
        <SwapRates
          ratePartners={ratePartners}
          locales={locales}
          sectionWidget={sectionWidget}
          amountSendCurrency={amountSendCurrency}
          amountResiveCurrency={amountResiveCurrency}
          typeSendCurrency={typeSendCurrency}
          typeResiveCurrency={typeResiveCurrency}
          currencies={currencies}
        />
      ) : (
        <div className="swap-currencies__offers">
          <span className="swap-currencies__offers-title">
            {amountResiveCurrency === ''
              ? locales.SWAP_WIDGET.CHANGE_OFFERS_TITLE
              : locales.SWAP_WIDGET.START_OFFERS_TITLE}
          </span>
          <span className="swap-currencies__offers-description">
            {amountResiveCurrency === '' && error
              ? localiztionHelper({
                  str: locales?.SWAP_WIDGET.CHANGE_OFFERS_DESCRIPTION_MIN,
                  params: {
                    amount: error,
                  },
                })
              : amountResiveCurrency === '' && !error
                ? locales.SWAP_WIDGET.CHANGE_OFFERS_DESCRIPTION
                : locales.SWAP_WIDGET.START_OFFERS_DESCRIPTION}
          </span>
        </div>
      )}
    </div>
  );
};

export default SwapCurrencies;
