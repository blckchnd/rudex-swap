import { useContext, useEffect } from 'react';
import './section-widget.scss';
import SwapCurrencies from '@components/SwapWidget/SwapCurrencies/SwapCurrencies';
import { localiztionHelper } from '@components/utils/utils';
import { InfoContext } from '@components/utils/provider/InfoProvider';

const SectionWidget = (props) => {
  const { typeSendCurrency, typeResiveCurrency } = useContext(InfoContext);
  const { locales, currencies, recieveCur, depositCur } = props;

  useEffect(() => {}, [typeSendCurrency, typeResiveCurrency]);

  return (
    <section className="section-widget">
      <div className="section-widget__wrapper">
        <h2 className="section-widget__title">
          {localiztionHelper({
            str: locales?.MORE_RATES_WIDGET_TITLE,
            params: {
              deposit: depositCur?.label,
              receive: recieveCur?.label,
            },
          })}
        </h2>
        <SwapCurrencies
          locales={locales}
          currencies={currencies}
          sectionWidget={true}
        />
      </div>
    </section>
  );
};

export default SectionWidget;
