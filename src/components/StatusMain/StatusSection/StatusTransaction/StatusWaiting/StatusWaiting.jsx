import { STATUS } from '@components/StatusMain/constant';
import './status-waiting.scss';

const StatusWaiting = ({ locales, exchangeTransaction }) => {
  const status = exchangeTransaction?.status;

  const titleInfo =
    exchangeTransaction === null
      ? 'No information'
      : {
          [STATUS?.CONFIRMING]:
            locales?.STATUS_TRANSACTION?.CONFIRMING_INFO?.TITLE_INFO,
          [STATUS?.EXCHANGING]:
            locales?.STATUS_TRANSACTION?.EXCHANGING_INFO?.TITLE_INFO,
          [STATUS?.SENDING]:
            locales?.STATUS_TRANSACTION?.SENDING_INFO?.TITLE_INFO,
        }[status] || '';

  const textInfo =
    exchangeTransaction === null
      ? 'No information'
      : {
          [STATUS?.CONFIRMING]:
            locales?.STATUS_TRANSACTION?.CONFIRMING_INFO?.TEXT_INFO,
          [STATUS?.EXCHANGING]:
            locales?.STATUS_TRANSACTION?.EXCHANGING_INFO?.TEXT_INFO,
          [STATUS?.SENDING]:
            locales?.STATUS_TRANSACTION?.SENDING_INFO?.TEXT_INFO,
        }[status] || '';

  return (
    <div className="status-waiting">
      <h3 className="status-waiting__title">{titleInfo}</h3>
      <span className="status-waiting__text">{textInfo}</span>
    </div>
  );
};

export default StatusWaiting;
