import { Fragment, useEffect } from 'react';
import Header from '@components/Header/Header';
import { scrollTop } from '@components/utils/utils';
import MainMoreRates from '@components/MainMoreRates/MainMoreRates';
import Footer from '@components/Footer/Footer';
import Popup from '@components/Popup/Popup';
import MenuBar from '@components/MenuBar/MenuBar';

const MoreRatesPage = ({
  locales,
  handleClickMenuBarButton,
  currencies,
  menuBarStatus,
}) => {
  useEffect(() => {
    setTimeout(function () {
      scrollTop();
    }, 100);
  }, []);

  return (
    <Fragment>
      <Header
        handleClickMenuBarButton={handleClickMenuBarButton}
        locales={locales}
      />
      <MainMoreRates locales={locales} currencies={currencies} />
      <Footer locales={locales} />
      <Popup locales={locales} />
      <MenuBar
        menuBarStatus={menuBarStatus}
        handleClickMenuBarButton={handleClickMenuBarButton}
        locales={locales}
      />
    </Fragment>
  );
};

export default MoreRatesPage;
