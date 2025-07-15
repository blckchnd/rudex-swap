import './popup-currency.scss';

const PopupCurrency = ({ method, amountFrom, ticker, network }) => {
  return (
    <section className="popup-currency">
      <div className="popup-currency__container">
        <span className="popup-currency__method">{method}</span>
        <span className="popup-currency__amount">{amountFrom}</span>
      </div>
      <span data-network={network} className="popup-currency__type">
        {ticker}
      </span>
    </section>
  );
};

export default PopupCurrency;
