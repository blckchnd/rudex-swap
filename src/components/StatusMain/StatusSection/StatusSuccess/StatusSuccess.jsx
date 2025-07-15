import { Fragment } from 'react';
import StatusText from '../shared/StatusText/StatusText';
import StatusTitle from '../shared/StatusTitle/StatusTitle';
import './status-success.scss';
import { getTime, localiztionHelper } from '@components/utils/utils';

const StatusSuccess = (props) => {
  const { locales, exchangeProcess, toCur, fromCur } = props;
  const timeSpent = () => {
    const time =
      Date.parse(exchangeProcess?.transaction?.finishedAt) -
      Date.parse(exchangeProcess?.transaction?.createdAt);

    return getTime(time);
  };

  return (
    <Fragment>
      <div className="status-success">
        <header className="status-success__header">
          <div className="status-success__icon" />
          <h3 className="status-success__title">
            {locales?.STATUS_SUCCESS?.HEADER_TITLE}
          </h3>
          <span className="status-success__subtitle">
            {localiztionHelper({
              str: locales?.STATUS_SUCCESS?.SWAP_INFO,
              params: {
                send: fromCur?.label,
                sendNetwork: {
                  value: fromCur?.network,
                  className: 'status-success__network',
                },
                recive: toCur?.label,
                reciveNetwork: {
                  value: toCur?.network,
                  className: 'status-success__network',
                },
              },
              className: 'status-success__bold',
            })}
          </span>
        </header>
      </div>

      <div className="status-success__result">
        <article className="status-success__info">
          <StatusTitle
            text={locales?.STATUS_SUCCESS?.AMOUNT_EXPECTED}
            className={'status-success__info-title'}
          />
          <StatusText text={exchangeProcess?.transaction?.amountEstimated} />
        </article>
        <article className="status-success__info">
          <StatusTitle
            text={locales?.STATUS_SUCCESS?.AMOUNT_RECEIVED}
            className={'status-success__info-title'}
          />
          <StatusText text={exchangeProcess?.transaction?.amountRealReceive} />
        </article>
        <article className="status-success__info">
          <StatusTitle
            text={locales?.STATUS_SUCCESS?.TIME_SPENT}
            className={'status-success__info-title'}
          />
          <StatusText
            text={timeSpent() + ' ' + locales?.STATUS_SUCCESS?.TIME_MIN}
          />
        </article>
      </div>
    </Fragment>
  );
};

export default StatusSuccess;
