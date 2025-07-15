import CloseButton from '@components/shared/Buttons/CloseButton/CloseButton';
import './swap-widget.scss';
import SwapCurrencies from './SwapCurrencies/SwapCurrencies';
import classNames from 'classnames';

const SwapWidget = ({
  swapButton,
  locales,
  clickButton,
  scrollPosition = 0,
  currencies,
}) => {
  const swapWidgetClass = classNames('swap-widget', { active: swapButton });
  const swapWidgetCloseClass = classNames('swap-widget__close', {
    active: scrollPosition >= 250,
  });

  return (
    <div className={swapWidgetClass}>
      {swapButton ? (
        <CloseButton
          className={swapWidgetCloseClass}
          handleClickButton={clickButton}
        />
      ) : (
        ''
      )}
      <SwapCurrencies locales={locales} currencies={currencies} />
    </div>
  );
};

export default SwapWidget;
