import './swap-currency-button.scss';
import { SVG_Loop } from '@components/utils/SVG';

const SwapCurrencyButton = ({ handleClickButton }) => {
  return (
    <button className="swap-currency-button" onClick={handleClickButton}>
      <SVG_Loop classSvg={'swap-currency-button__loop'} />
    </button>
  );
};

export default SwapCurrencyButton;
