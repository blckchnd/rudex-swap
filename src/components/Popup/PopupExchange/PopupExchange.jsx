import './popup-exchange.scss';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupCurrency from './PopupCurrency/PopupCurrency';
import Button from '@components/shared/Buttons/Button/Button';
import axiosRequest from '@components/utils/hooks/axiosRequestHook';
import { localiztionHelper } from '@components/utils/utils';
import Input from '@components/shared/Input/Input';
import PopupHeader from '../PopupHeader/PopupHeader';
import PopupDescriptionTitle from '../common/PopupDescriptionTitle/PopupDescriptionTitle';
import PopupDecritptionText from '../common/PopupDecritptionText/PopupDecritptionText';
import PopupFooter from '../PopupFooter/PopupFooter';
import classNames from 'classnames';
import InputHidden from '@components/shared/Input/InputHidden';
import { InfoContext } from '@components/utils/provider/InfoProvider';

const PARTNER_FIX = {
  CHANGELLY: 'changelly_fix',
  CHANGEHERO: 'changehero_fix',
};

const PopupExchange = ({
  locales,
  setLoader,
  hadleClickClosePopup,
  handleCkickRefundSettings,
  setAdvanced,
  error,
  errorMessage,
  setError,
  setErrorMessage,
  exchange,
  popupActive,
  advanced,
}) => {
  const { typeSendCurrency, typeResiveCurrency } = useContext(InfoContext);

  const [inputAdress, setInputAdress] = useState('');
  const [inputMemo, setInputMemo] = useState('');
  const [inputRefund, setInputRefund] = useState('');
  const [inputRefundMemo, setInputRefundMemo] = useState('');

  const [disabledButton, setDisabledButton] = useState(true);
  const navigate = useNavigate();

  const refundPartner =
    exchange?.adapter === PARTNER_FIX?.CHANGEHERO ||
    exchange?.adapter === PARTNER_FIX?.CHANGELLY;

  const handleInputAdress = (evt) => {
    setInputAdress(evt.target.value);
  };

  const handleInputRefund = (evt) => {
    setInputRefund(evt.target.value);
  };

  const handleInputMemo = (evt) => {
    setInputMemo(evt.target.value);
  };

  const handleInputRefundMemo = (evt) => {
    setInputRefundMemo(evt.target.value);
  };

  useEffect(() => {
    if (!popupActive) {
      setInputAdress('');
      setInputMemo('');
      setInputRefund('');
      setInputRefundMemo('');
    }
  }, [popupActive]);

  useEffect(() => {
    const isInputAddressValid = inputAdress?.length >= 2;
    const isInputRefundValid = refundPartner
      ? inputRefund?.length >= 2
      : inputRefund?.length === 0 || inputRefund?.length >= 2;

    if (isInputAddressValid && isInputRefundValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [inputAdress, inputMemo, inputRefund, inputRefundMemo]);

  const handleCreateExchange = (props) => {
    if (props?.error) {
      setLoader(false);
      setError(true);
      setErrorMessage(props.message);
    } else {
      setError(false);
      setErrorMessage('');
      setLoader(false);
      navigate('/status', { state: props });
      hadleClickClosePopup();
    }
  };

  const handleClickExchange = (evt) => {
    evt.preventDefault();
    setError(false);
    setErrorMessage('');

    const params = {
      from: exchange?.from,
      to: exchange?.to,
      amountDeposit: exchange?.amountFrom,
      addressReceive: inputAdress,
      quotaId: exchange?.quotaId,
    };

    if (inputMemo) {
      params['extraIdReceive'] = inputMemo;
    }

    if (inputRefund) {
      params['refundAddress'] = inputRefund;
    }

    if (inputRefundMemo) {
      params['refundExtraId'] = inputRefundMemo;
    }

    if (exchange?.offerReferenceId) {
      params['offerReferenceId'] = exchange?.offerReferenceId;
    }

    setLoader(true);
    axiosRequest({
      method: 'POST',
      url: 'create',
      data: params,
      callback: handleCreateExchange,
    });
  };

  useEffect(() => {
    if (refundPartner) {
      setAdvanced(true);
    }
  }, [exchange?.adapter]);

  const popupExchangeFooterClass = classNames('popup-exchange__footer', {
    active: advanced,
  });

  return (
    <Fragment>
      <PopupHeader
        title={locales.POPUP_EXCHANGE.TITLE}
        handleClickButton={hadleClickClosePopup}
      />
      <section className="popup-exchange__currency">
        <PopupCurrency
          method={locales.POPUP_EXCHANGE.SEND}
          amountFrom={exchange?.amountFrom}
          ticker={typeSendCurrency?.label}
          network={exchange?.fromNetwork}
        />
        <PopupCurrency
          method={locales.POPUP_EXCHANGE.RECIVE}
          amountFrom={exchange?.amountTo}
          ticker={typeResiveCurrency?.label}
          network={exchange?.toNetwork}
        />
      </section>

      <form id="exchange-form" className="popup-exchange__inputs">
        <Input
          idName={'recive'}
          label={locales.POPUP_EXCHANGE.INPUT_ADRESS_LABEL}
          handleInput={handleInputAdress}
          input={inputAdress}
          placeholder={localiztionHelper({
            str: locales.POPUP_EXCHANGE.INPUT_ADRESS_DESCRIPTION,
            params: {
              recive: exchange?.to?.toUpperCase(),
            },
          })}
          required
        />

        <InputHidden
          idName={'destination'}
          label={locales.POPUP_EXCHANGE.INPUT_DESTINATION_LABEL}
          handleInput={handleInputMemo}
          input={inputMemo}
          placeholder={locales.POPUP_EXCHANGE.INPUT_DESTINATION_DESCRIPTION}
        />
        {refundPartner && (
          <div className="popup-exchange__refund-partner">
            <Input
              idName={'refund'}
              label={locales.POPUP_EXCHANGE.INPUT_REFUND_LABEL}
              handleInput={handleInputRefund}
              input={inputRefund}
              placeholder={localiztionHelper({
                str: refundPartner
                  ? locales.POPUP_EXCHANGE.INPUT_REFUND_DESCRIPTION_REQ
                  : locales.POPUP_EXCHANGE.INPUT_REFUND_DESCRIPTION,
                params: {
                  refund: exchange?.from?.toUpperCase(),
                },
              })}
              required={refundPartner}
            />
            <InputHidden
              idName={'refund-memo'}
              label={locales.POPUP_EXCHANGE.INPUT_DESTINATION_LABEL}
              handleInput={handleInputRefundMemo}
              input={inputRefundMemo}
              placeholder={locales.POPUP_EXCHANGE.INPUT_DESTINATION_DESCRIPTION}
            />
          </div>
        )}

        <Button
          className={'popup-exchange__button'}
          text={locales.POPUP_EXCHANGE.EXCHANGE_BUTTON}
          onClick={handleClickExchange}
          disabledButton={disabledButton}
          type={'submit'}
          form={'exchange-form'}
        />
        {error && (
          <section className="popup-exchange__error">
            <PopupDescriptionTitle
              text={locales?.POPUP_EXCHANGE?.ERORR_MESSAGE}
            />
            <PopupDecritptionText
              id={'error-exchage'}
              text={errorMessage}
              className="popup-exchange__error-message"
            />
          </section>
        )}
        {!refundPartner && (
          <PopupFooter className={popupExchangeFooterClass}>
            <button
              type="button"
              className={`popup-exchange__refund`}
              onClick={handleCkickRefundSettings}
            >
              {locales.POPUP_EXCHANGE.INPUT_ADVANCED_SETTINGS}
            </button>

            <Fragment>
              <Input
                idName={'refund'}
                classWrapper={`popup-exchange__advanced`}
                label={locales.POPUP_EXCHANGE.INPUT_REFUND_LABEL}
                handleInput={handleInputRefund}
                input={inputRefund}
                placeholder={localiztionHelper({
                  str: refundPartner
                    ? locales.POPUP_EXCHANGE.INPUT_REFUND_DESCRIPTION_REQ
                    : locales.POPUP_EXCHANGE.INPUT_REFUND_DESCRIPTION,
                  params: {
                    refund: exchange?.from?.toUpperCase(),
                  },
                })}
                required={refundPartner}
              />
              <InputHidden
                idName={'refund-memo'}
                classWrapper={`popup-exchange__advanced`}
                label={locales.POPUP_EXCHANGE.INPUT_DESTINATION_LABEL}
                handleInput={handleInputRefundMemo}
                input={inputRefundMemo}
                placeholder={
                  locales.POPUP_EXCHANGE.INPUT_DESTINATION_DESCRIPTION
                }
              />
            </Fragment>
          </PopupFooter>
        )}
      </form>
    </Fragment>
  );
};

export default PopupExchange;
