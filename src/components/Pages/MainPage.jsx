import { Fragment, useEffect, useState } from 'react';

import HeaderWidget from '@components/HeaderWidget/HeaderWidget';
import Main from '@components/Main/Main';
import useScroll from '@components/utils/hooks/useScroll';
import { scrollTop } from '@components/utils/utils';
import Footer from '@components/Footer/Footer';
import MenuBar from '@components/MenuBar/MenuBar';
import Popup from '@components/Popup/Popup';

const MainPage = ({
  locales,
  currencies,
  handleClickMenuBarButton,
  menuBarStatus,
}) => {
  const scrollPosition = useScroll();
  const [swapButton, setSwapButton] = useState(false);
  const [scrollPositionOpen, setScrollPositionOpen] = useState(0);

  useEffect(() => {
    setTimeout(function () {
      scrollTop();
    }, 100);
  }, []);

  useEffect(() => {
    if (swapButton && Math.abs(scrollPosition - scrollPositionOpen) > 250) {
      setScrollPositionOpen(scrollPosition);
      setSwapButton(false);
    } else if (scrollPosition === 0) {
      setScrollPositionOpen(0);
      setSwapButton(true);
    }
  }, [scrollPosition]);

  return (
    <Fragment>
      <HeaderWidget
        handleClickMenuBarButton={handleClickMenuBarButton}
        locales={locales}
        swapButton={swapButton}
        setSwapButton={setSwapButton}
        scrollPosition={scrollPosition}
        currencies={currencies}
      />
      <Main
        scrollPosition={scrollPosition}
        locales={locales}
        swapButton={swapButton}
      />
      <Footer locales={locales} swapButton={swapButton} />
      <Popup locales={locales} />
      <MenuBar
        menuBarStatus={menuBarStatus}
        handleClickMenuBarButton={handleClickMenuBarButton}
        locales={locales}
      />
    </Fragment>
  );
};

export default MainPage;
