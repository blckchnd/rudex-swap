import './swap-rate.scss';
import { useContext, useEffect, useState } from 'react';
import Button from '@components/shared/Buttons/Button/Button';
import { InfoContext } from '@components/utils/provider/InfoProvider';
import classNames from 'classnames';
import { checkCurrencies } from '@components/utils/utils';

const SwapRate = ({ partner, locales, best, currencies }) => {
  const { handleClickPopupActive, handleClickPopupExchange } =
    useContext(InfoContext);
  const [toPartner, setToPartner] = useState({
    label: '',
    network: '',
  });

  const partnerFix = partner?.adapter.includes('_fix');
  const partnerName = partnerFix
    ? partner?.adapter.replace(/_fix/gi, ' Fix')
    : partner?.adapter;
  const partnerIcon = partnerFix
    ? partner?.adapter.replace(/_fix/gi, '').toLowerCase()
    : partner?.adapter.toLowerCase();

  const handleClickExchange = () => {
    handleClickPopupActive();
    handleClickPopupExchange(partner);
  };

  useEffect(() => {
    if (currencies) {
      currencies.map((item) => {
        if (item?.ticker?.toUpperCase() === partner?.to?.toUpperCase()) {
          setToPartner(checkCurrencies(item));
        }
      });
    }
  }, [currencies, partner]);

  return (
    <article className="swap-rate">
      <div
        style={{
          '--partner-img': `url(/assets/images//partners/${partnerIcon}.svg)`,
        }}
        className={classNames('swap-rate__title-container', partnerIcon)}
      >
        <h3 className="swap-rate__title">{partnerName}</h3>
        {best && (
          <span className="swap-rate__info">
            {locales.SWAP_WIDGET.BEST_RATE}
          </span>
        )}
      </div>

      <div className="swap-rate__description">
        <div className="swap-rate__amount">
          <p>{partner?.amountTo}</p>
          <span className="swap-rate__cur" data-network={toPartner?.network}>
            {toPartner?.label}
          </span>
        </div>
        <div className="swap-rate__items">
          <p className="swap-rate__text">
            <span className="swap-rate__text-sub">
              {locales.SWAP_WIDGET.RATE.TITLE}:{' '}
            </span>
            {partnerFix
              ? locales.SWAP_WIDGET.RATE.FIX
              : locales.SWAP_WIDGET.RATE.FLOAT}
          </p>
          <p className="swap-rate__text">
            <span className="swap-rate__text-sub swap-rate__eta">
              {locales.SWAP_WIDGET.ETA}:{' '}
            </span>
            {partner?.time} {locales.SWAP_WIDGET.TIME}
          </p>
        </div>
      </div>
      <Button
        text={locales.SWAP_WIDGET.EXCHANGE_BUTTON}
        className="swap-rate__button"
        onClick={handleClickExchange}
      />
    </article>
  );
};

export default SwapRate;
