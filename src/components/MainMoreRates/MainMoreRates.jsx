import CheckStatus from '@components/Main/CheckStatus/CheckStatus';
import SectionWidget from './SectionWidget/SectionWidget';
import HowToSwap from './HowToSwap/HowToSwap';
import Features from '@components/Main/Features/Features';
import Questions from './Questions/Questions';
import { useContext, useEffect, useState } from 'react';
import { InfoContext } from '@components/utils/provider/InfoProvider';
import { checkCurrencies } from '@components/utils/utils';

const MainMoreRates = ({ locales, currencies }) => {
  const { typeSendCurrency, typeResiveCurrency } = useContext(InfoContext);
  const [depositCur, setDepositCur] = useState({
    label: '',
    network: '',
  });
  const [recieveCur, setRecieveCur] = useState({
    label: '',
    network: '',
  });

  useEffect(() => {
    if (currencies) {
      currencies.map((item) => {
        if (
          item?.ticker?.toUpperCase() ===
          typeResiveCurrency?.value.toUpperCase()
        ) {
          setRecieveCur(checkCurrencies(item));
        }
        if (
          item?.ticker?.toUpperCase() === typeSendCurrency?.value.toUpperCase()
        ) {
          setDepositCur(checkCurrencies(item));
        }
      });
    }
  }, [currencies, typeSendCurrency, typeResiveCurrency]);

  return (
    <main className="main-page">
      <SectionWidget
        locales={locales}
        currencies={currencies}
        recieveCur={recieveCur}
        depositCur={depositCur}
      />
      <HowToSwap
        locales={locales}
        recieveCur={recieveCur}
        depositCur={depositCur}
      />
      <Features locales={locales} />
      <CheckStatus locales={locales} />
      <Questions locales={locales} />
    </main>
  );
};

export default MainMoreRates;
