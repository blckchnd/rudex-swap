import './header-widget.scss';
import SwapButton from './SwapButton/SwapButton';
import { Link, useNavigate } from 'react-router-dom';
import BurgerButton from '@components/shared/Buttons/BurgerButton/BurgerButton';
import { SVG_Header_pin } from '@components/utils/SVG';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

const HeaderWidget = ({
  handleClickMenuBarButton,
  locales,
  swapButton,
  setSwapButton,
  scrollPosition,
  currencies,
}) => {
  const [showScrollClass, setShowScrollClass] = useState(false);
  const widgetRef = useRef(null);
  const navigate = useNavigate();

  const clickSwapButton = () => {
    const willBeOpened = !swapButton;
    setSwapButton(willBeOpened);

    document.body.style.overflowY = willBeOpened ? 'hidden' : 'scroll';

    if (willBeOpened) {
      setTimeout(() => {
        if (widgetRef.current) {
          const rect = widgetRef.current.getBoundingClientRect();
          if (rect.bottom > window.innerHeight) {
            navigate('/more-rates');
          }
        }
      }, 250);
    }
  };

  useEffect(() => {
    if (scrollPosition > 250 && !showScrollClass) {
      setShowScrollClass(true);
    } else if (scrollPosition === 0 && showScrollClass) {
      setShowScrollClass(false);
    } else return;
  }, [scrollPosition, showScrollClass]);

  const headerClass = classNames('header-widget', {
    scroll: showScrollClass,
    active: swapButton,
  });

  return (
    <header className={headerClass}>
      <div className={'header-widget__back'} />
      <SVG_Header_pin classSvg={'header-widget__pin'} />
      <div className={'header-widget__elements'}>
        <Link path={'/'} className="header__logo" />
        <BurgerButton onClick={handleClickMenuBarButton} />
      </div>
      <SwapButton
        swapButton={swapButton}
        clickButton={clickSwapButton}
        locales={locales}
        scrollPosition={scrollPosition}
        currencies={currencies}
        widgetRef={widgetRef}
      />
    </header>
  );
};

export default HeaderWidget;
