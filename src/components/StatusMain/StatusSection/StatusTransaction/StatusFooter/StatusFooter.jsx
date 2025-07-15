import StatusContainer from '../../shared/StatusContainer/StatusContainer';
import StatusText from '../../shared/StatusText/StatusText';
import StatusTitle from '../../shared/StatusTitle/StatusTitle';
import './status-footer.scss';
import CopyButton from '@components/shared/Buttons/CopyButton/CopyButton';

const StatusFooter = (props) => {
  const { exchangeTransaction, locales, toCur } = props;

  return (
    <footer className="status-footer">
      <div className="status-info__container status-footer__container">
        <StatusTitle text={locales.STATUS_TRANSACTION?.INFO?.RESULT_WALLET} />
        <StatusText
          id={'addressDeposit'}
          text={exchangeTransaction?.addressReceive}
        />
      </div>
      {exchangeTransaction?.extraIdReceive && (
        <article className="status-info__container">
          <StatusTitle text={locales.STATUS_TRANSACTION?.INFO?.MEMO} />
          <CopyButton
            copy={exchangeTransaction?.extraIdReceive}
            copyId={'extraIdDeposit'}
          />
        </article>
      )}
      <div className="status-info__container status-footer__container">
        <StatusTitle text={locales.STATUS_TRANSACTION?.INFO?.RESULT_AMOUNT} />
        <StatusContainer
          id={'addressDeposit'}
          amount={'~ ' + exchangeTransaction?.amountEstimated}
          label={toCur?.label}
          network={toCur?.network}
        />
      </div>
      <div className="status-info__container status-footer__container">
        <StatusTitle text={locales.STATUS_TRANSACTION?.INFO?.EXCHANGE_ID} />
        <CopyButton
          copy={exchangeTransaction?.id}
          copyId={'exchangeId'}
          classText={'attention'}
        />
      </div>
    </footer>
  );
};

export default StatusFooter;
