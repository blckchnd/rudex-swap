import Questions from '@components/MainMoreRates/Questions/Questions';
import AboutUs from './AboutUs/AboutUs';
import CheckStatus from './CheckStatus/CheckStatus';
import Features from './Features/Features';
import HowItWorks from './HowItWorks/HowItWorks';
import './main.scss';
import Products from './Products/Products';
import StartSwap from './StartSwap/StartSwap';
import { useEffect, useRef, useState } from 'react';
import { scrollTop } from '@components/utils/utils';
import classNames from 'classnames';

const Main = ({ scrollPosition, locales, swapButton }) => {
  const [showScrollClass, setShowScrollClass] = useState(false);
  const prevScroll = useRef(0);

  useEffect(() => {
    setTimeout(function () {
      scrollTop();
    }, 50);
  }, []);

  useEffect(() => {
    if (scrollPosition > 250 && !showScrollClass) {
      setShowScrollClass(true);
    } else if (scrollPosition === 0 && showScrollClass) {
      setShowScrollClass(false);
    } else return;

    prevScroll.current = scrollPosition;
  }, [scrollPosition, showScrollClass]);

  const mainClass = classNames('main', {
    scroll: showScrollClass,
    active: swapButton,
  });

  return (
    <main className={mainClass}>
      <HowItWorks locales={locales} />
      <CheckStatus locales={locales} />
      <Features locales={locales} />
      <AboutUs locales={locales} />
      <Products locales={locales} />
      <StartSwap locales={locales} />
      <Questions locales={locales} />
    </main>
  );
};

export default Main;
