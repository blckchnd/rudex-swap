import { Fragment, useEffect } from 'react';
import { scrollTop } from '@components/utils/utils';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import Popup from '@components/Popup/Popup';
import MenuBar from '@components/MenuBar/MenuBar';
import StatusMain from '@components/StatusMain/StatusMain';

const StatusPage = ({
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
      <StatusMain locales={locales} currencies={currencies} />
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

export default StatusPage;
