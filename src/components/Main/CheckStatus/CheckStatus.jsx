import { Fragment, useEffect, useState } from 'react';
import './check-status.scss';
import Button from '@components/shared/Buttons/Button/Button';
import Input from '@components/shared/Input/Input';
import axiosRequest from '@components/utils/hooks/axiosRequestHook';
import CheckStatusText from './CheckStatusText/CheckStatusText';
import { changeStatusName } from '@components/utils/utils';
import { Loader } from '@components/shared/Loader/Loader';
import { STATUS } from '@components/StatusMain/constant';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const CheckStatus = ({ locales }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [info, setInfo] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);
  const [loader, setLoader] = useState(false);

  const checkStatusInfo = classNames('check-status__info', {
    active: info,
  });

  const handleInputStatus = (evt) => {
    setInput(evt.target.value);
  };

  const handleUpdateInfo = (res) => {
    setInfo(res);
    setLoader(false);
  };

  const handleClickButton = (evt) => {
    evt.preventDefault();
    setInfo(null);
    setLoader(true);
    axiosRequest({
      method: 'GET',
      url: 'tx',
      data: {
        id: input,
      },
      callback: handleUpdateInfo,
    });
  };

  const handleCheckStatusMore = () => {
    if (info) {
      navigate('/status', { state: info });
    }
  };

  useEffect(() => {
    const regex = /^[a-zA-Z0-9]+$/;

    if (regex.test(input) && input.length > 5) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [input]);

  return (
    <section className="check-status" id="check-status">
      <div className="check-status__wrapper">
        <h2 className="check-status__title">{locales?.CHECK_STATUS?.TITLE}</h2>
        <div className="check-status__container">
          <form id="check-status-form" className="check-status__form">
            <Input
              idName={'check-status'}
              label={locales?.CHECK_STATUS?.LABEL}
              handleInput={handleInputStatus}
              input={input}
              placeholder={'6716925b458g3d8fatbv37d4'}
              classWrapper={'check-status__input'}
              classFields="check-status__fields"
              classLabel="check-status__label"
            />
            {loader ? (
              <Loader
                size="m"
                color="white"
                className={'check-status__loader'}
              />
            ) : (
              <Button
                type={'submit'}
                form={'check-status-form'}
                text={locales?.CHECK_STATUS?.BUTTON}
                className={'check-status__button'}
                onClick={handleClickButton}
                disabledButton={disabledButton}
                color={'white'}
              />
            )}
          </form>
          {info?.error ? (
            <span className="check-status__error">
              {locales?.STATUS?.FAILED}
            </span>
          ) : (
            <Fragment>
              <div className={checkStatusInfo}>
                {info?.transaction?.status && (
                  <CheckStatusText
                    type={locales?.CHECK_STATUS?.INFO?.STATUS}
                    result={
                      changeStatusName({
                        name: info?.transaction?.status,
                        locales: locales,
                      }) || ''
                    }
                    classType={'status'}
                  />
                )}
                {info?.transaction?.createdAt && (
                  <CheckStatusText
                    type={locales?.CHECK_STATUS?.INFO?.CREATED_TIME}
                    result={
                      new Date(info?.transaction?.createdAt).toLocaleString() ||
                      ''
                    }
                    classType={'date'}
                  />
                )}
                {info?.transaction?.amountDeposit &&
                  (info?.transaction?.status === STATUS?.WAITING ? (
                    <CheckStatusText
                      type={locales?.CHECK_STATUS?.INFO?.DEPOSIT}
                      result={
                        info?.transaction?.amountDeposit +
                          ' ' +
                          info?.transaction?.from?.toUpperCase() || ''
                      }
                      classType={'dep'}
                    />
                  ) : (
                    <CheckStatusText
                      type={locales?.CHECK_STATUS?.INFO?.DEPOSITED}
                      result={
                        info?.transaction?.amountDeposit +
                          ' ' +
                          info?.transaction?.from?.toUpperCase() || ''
                      }
                      classType={'dep'}
                    />
                  ))}
                {info?.transaction?.amountRealReceive ? (
                  <CheckStatusText
                    type={locales?.CHECK_STATUS?.INFO?.RECIEVED}
                    result={
                      info?.transaction?.amountEstimated +
                        ' ' +
                        info?.transaction?.to?.toUpperCase() || ''
                    }
                    classType={'rec'}
                  />
                ) : info?.transaction?.amountEstimated ? (
                  <CheckStatusText
                    type={locales?.CHECK_STATUS?.INFO?.RECIEVE}
                    result={
                      '~ ' +
                        info?.transaction?.amountEstimated +
                        ' ' +
                        info?.transaction?.to?.toUpperCase() || ''
                    }
                    classType={'rec'}
                  />
                ) : (
                  ''
                )}

                {info?.transaction?.addressReceive && (
                  <CheckStatusText
                    type={locales?.CHECK_STATUS?.INFO?.ADRESS_DEPOSIT}
                    result={info?.transaction?.addressDeposit || ''}
                    classType={'dep-adr'}
                  />
                )}
                {info?.transaction?.addressReceive && (
                  <CheckStatusText
                    type={locales?.CHECK_STATUS?.INFO?.ADRESS_RECEIVE}
                    result={info?.transaction?.addressReceive || ''}
                    classType={'rec-adr'}
                  />
                )}
              </div>
              {info &&
                info?.transaction?.status !== STATUS?.FAILED &&
                info?.transaction?.status !== STATUS?.REFUNDED &&
                info?.transaction?.status !== STATUS?.OVERDUE && (
                  <Button
                    text={locales?.CHECK_STATUS?.MORE}
                    onClick={handleCheckStatusMore}
                    color={'white'}
                  />
                )}
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckStatus;
