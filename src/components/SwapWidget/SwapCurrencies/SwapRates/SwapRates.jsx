import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import './swap-rates.scss';
import SwapRate from './SwapRate/SwapRate';
import Button from '@components/shared/Buttons/Button/Button';

const SwapRates = ({
  ratePartners,
  locales,
  sectionWidget,
  amountSendCurrency = 0,
  amountResiveCurrency = 0,
  typeSendCurrency = {},
  typeResiveCurrency = {},
  currencies,
}) => {
  const navigate = useNavigate();

  const handleClickMore = () => {
    if (
      amountSendCurrency &&
      amountResiveCurrency &&
      typeSendCurrency &&
      typeResiveCurrency
    ) {
      navigate('/more-rates', {
        state: {
          amountSendCurrency: amountSendCurrency,
          amountResiveCurrency: amountResiveCurrency,
          typeSendCurrency: typeSendCurrency,
          typeResiveCurrency: typeResiveCurrency,
        },
      });
    } else {
      navigate('/more-rates');
    }
  };

  return (
    <div className="swap-rates">
      <h3 className="swap-rates__title">{locales.SWAP_WIDGET.SELECT_OFFER}</h3>
      <div className="swap-rates__contaner">
        {sectionWidget ? (
          ratePartners?.map((item, index) => {
            return (
              <SwapRate
                key={`swap-rate${index}`}
                partner={item}
                locales={locales}
                best={index === 0}
                currencies={currencies}
              />
            );
          })
        ) : ratePartners?.length > 1 ? (
          <Fragment>
            <SwapRate
              partner={ratePartners[0]}
              locales={locales}
              best={true}
              currencies={currencies}
            />
            <Button
              text={`${locales.SWAP_WIDGET.MORE_BUTTON} (${ratePartners?.length})`}
              onClick={handleClickMore}
              className={'swap-rates__button'}
            />
          </Fragment>
        ) : (
          <SwapRate
            partner={ratePartners[0]}
            locales={locales}
            best={true}
            currencies={currencies}
          />
        )}
      </div>
    </div>
  );
};

export default SwapRates;
