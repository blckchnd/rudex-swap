import './status-transaction.scss';
import StatusInfo from './StatusInfo/StatusInfo';
import StatusImage from './StatusImage/StatusImage';
import StatusWaiting from './StatusWaiting/StatusWaiting';
import { STATUS } from '@components/StatusMain/constant';
import StatusFooter from './StatusFooter/StatusFooter';
import StatusTitle from '../shared/StatusTitle/StatusTitle';
import classNames from 'classnames';
import StatusContainer from '../shared/StatusContainer/StatusContainer';

const StatusTransaction = (props) => {
  const { locales, exchangeProcess, fromCur, toCur } = props;
  const exchangeTransaction = exchangeProcess?.transaction;

  const waitingStatus = exchangeTransaction?.status === STATUS.WAITING;
  const finishedStatus = exchangeTransaction?.status === STATUS.FINISHED;

  const titleHeader =
    exchangeProcess === null
      ? 'No information'
      : waitingStatus
        ? locales?.STATUS_TRANSACTION?.HEADER
        : {
            [STATUS?.CONFIRMING]:
              locales?.STATUS_TRANSACTION?.CONFIRMING_INFO?.TITLE_HEADER,
            [STATUS?.EXCHANGING]:
              locales?.STATUS_TRANSACTION?.EXCHANGING_INFO?.TITLE_HEADER,
            [STATUS?.SENDING]:
              locales?.STATUS_TRANSACTION?.SENDING_INFO?.TITLE_HEADER,
          }[exchangeTransaction?.status] || '';

  return (
    <div className="status-transaction">
      <div className="status-transaction__subtitle">
        <p>{locales?.STATUS_TRANSACTION?.SUBTITLE_ONE}</p>
        <p>{locales?.STATUS_TRANSACTION?.SUBTITLE_TWO}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: locales?.STATUS_TRANSACTION?.SUBTITLE_ATTENTION,
          }}
        />
      </div>
      <div className="status-transaction__container">
        <StatusImage
          exchangeTransaction={exchangeTransaction}
          locales={locales}
        />
        <div className="status-transaction__block">
          <div className={`status-transaction__header`}>
            <StatusTitle
              text={titleHeader}
              className={classNames({
                'status-transaction__header-title': !waitingStatus,
              })}
            />
            {waitingStatus && (
              <StatusContainer
                id={'amountDeposit'}
                amount={exchangeTransaction?.amountDeposit}
                label={fromCur?.label}
                network={fromCur?.network}
              />
            )}
          </div>
          {waitingStatus && (
            <StatusInfo
              exchangeTransaction={exchangeTransaction}
              locales={locales}
            />
          )}
          {!finishedStatus && !waitingStatus && (
            <StatusWaiting
              exchangeTransaction={exchangeTransaction}
              locales={locales}
            />
          )}
          {!finishedStatus && (
            <StatusFooter
              exchangeTransaction={exchangeTransaction}
              locales={locales}
              toCur={toCur}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusTransaction;
