import useWindowWidth from '@components/utils/hooks/useWindowWidth';
import './status-info.scss';
import { mediaMinTablet } from '@components/utils/utils';
import { QRCodeCanvas } from 'qrcode.react';

import CopyButton from '@components/shared/Buttons/CopyButton/CopyButton';
import StatusInfoTimer from './StatusInfoTimer';
import StatusTitle from '../../shared/StatusTitle/StatusTitle';

const StatusInfo = ({ exchangeTransaction, locales }) => {
  const windowWidth = useWindowWidth();

  return (
    <div className="status-info">
      {windowWidth >= mediaMinTablet
        ? exchangeTransaction?.addressDeposit && (
            <QRCodeCanvas
              className={'status-info__qrcode'}
              value={exchangeTransaction?.addressDeposit}
            />
          )
        : ''}
      <div className="status-info__block">
        <article className="status-info__container copy">
          <StatusTitle text={locales.STATUS_TRANSACTION?.INFO?.ADRESS} />
          <CopyButton
            copy={exchangeTransaction?.addressDeposit}
            copyId={'addressReceive'}
          />
        </article>
        {exchangeTransaction?.extraIdDeposit && (
          <article className="status-info__container">
            <StatusTitle text={locales.STATUS_TRANSACTION?.INFO?.MEMO} />
            <CopyButton
              copy={exchangeTransaction?.extraIdDeposit}
              copyId={'extraIdDeposit'}
            />
          </article>
        )}
        <article className="status-info__container timer no-border">
          <StatusTitle text={locales.STATUS_TRANSACTION?.INFO?.TIME} />
          <StatusInfoTimer
            text={locales.STATUS_TRANSACTION?.INFO?.TIME_IS_OVER}
            payTill={exchangeTransaction?.payTill}
          />
        </article>
      </div>
    </div>
  );
};

export default StatusInfo;
