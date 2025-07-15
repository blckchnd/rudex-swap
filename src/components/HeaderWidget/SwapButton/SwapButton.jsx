import { SVG_Circle_Text, SVG_Icon_Triangle } from '@components/utils/SVG';
import './swap-button.scss';
import SwapWidget from '@components/SwapWidget/SwapWidget';
import classNames from 'classnames';

const SwapButton = ({
  swapButton,
  clickButton,
  locales,
  currencies,
  scrollPosition,
  widgetRef,
}) => {
  const swapButtonClass = classNames('swap-button', {
    active: swapButton,
  });

  return (
    <div ref={widgetRef} className={swapButtonClass}>
      <button className={`swap-button__button`} onClick={clickButton}>
        <SVG_Icon_Triangle classSvg={'swap-button__icon'} />
        <SVG_Circle_Text
          text={locales.SWAP_BUTTON}
          classSvg={'swap-button__circle'}
          classText={'swap-button__circle-text'}
        />
      </button>
      <SwapWidget
        swapButton={swapButton}
        locales={locales}
        clickButton={clickButton}
        scrollPosition={scrollPosition}
        currencies={currencies}
      />
    </div>
  );
};

export default SwapButton;
