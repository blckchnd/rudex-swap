import './popup.scss';
import { useContext, useEffect, useState } from 'react';
import { InfoContext } from '@components/utils/provider/InfoProvider';

import PopupExchange from './PopupExchange/PopupExchange';
import { Loader } from '@components/shared/Loader/Loader';
import { clickOverlay } from '@components/utils/utils';
import classNames from 'classnames';

const Popup = ({ locales }) => {
  const {
    exchange,
    handleClickPopupActive,
    handleUpdateExchangeProcess,
    popupActive,
    handleUpdateTransactionId,
  } = useContext(InfoContext);
  const [advanced, setAdvanced] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const hadleClickClosePopup = () => {
    setError(false);
    setErrorMessage('');
    handleClickPopupActive();
    setAdvanced(false);
  };

  const handleCkickRefundSettings = () => {
    setAdvanced(!advanced);
  };

  useEffect(() => {
    if (popupActive) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [popupActive]);

  useEffect(() => {
    clickOverlay({
      classActive: 'active',
      activeType: popupActive,
      handleFunc: hadleClickClosePopup,
    });
  }, [popupActive]);

  const popupClass = classNames('popup', { active: popupActive });

  return (
    <section className={popupClass}>
      <div className={`popup__wrapper popup__wrapper-tab`}>
        {loader && (
          <div className="popup__loader">
            <Loader size="l" />
          </div>
        )}
        <PopupExchange
          locales={locales}
          setLoader={setLoader}
          hadleClickClosePopup={hadleClickClosePopup}
          handleCkickRefundSettings={handleCkickRefundSettings}
          setAdvanced={setAdvanced}
          error={error}
          errorMessage={errorMessage}
          setError={setError}
          setErrorMessage={setErrorMessage}
          exchange={exchange}
          handleUpdateExchangeProcess={handleUpdateExchangeProcess}
          handleUpdateTransactionId={handleUpdateTransactionId}
          advanced={advanced}
        />
      </div>
    </section>
  );
};

export default Popup;
