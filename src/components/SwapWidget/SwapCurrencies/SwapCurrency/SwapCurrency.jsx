import './swap-currency.scss';
import Select from 'react-select';
import { Loader } from '@components/shared/Loader/Loader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import classNames from 'classnames';
import imageList from '@components/utils/imageList';
import { randomNumber } from '@components/utils/utils';
import { useEffect, useState } from 'react';

const SwapCurrency = ({
  method,
  id,
  currencies,
  currencyState,
  changeCurrencySelect,
  disabledInput,
  amountCurrency,
  handleCurrencyInput,
  loading,
  disabledSelect,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      currencies.map((item) => {
        const regex = item?.tickerNetwork?.toUpperCase() || null;
        const label =
          regex !== null && item?.ticker?.toUpperCase().includes(regex)
            ? item?.ticker.toUpperCase().replace(regex, '')
            : item?.ticker.toUpperCase();

        return {
          value: item?.ticker,
          label: label,
          description: item?.name,
          network: item?.network,
        };
      })
    );
  }, [currencies]);

  const CustomValueContainer = ({ children }) => {
    const selectedCurrency = currencies.find(
      (item) => item?.ticker === currencyState?.value
    );

    const srcFind =
      imageList?.find(
        (value) => value?.name === selectedCurrency?.ticker?.toUpperCase()
      )?.src || null;

    return (
      <div className="swap-currency__container">
        {children}
        <div className="swap-currency__single">
          <LazyLoadImage
            src={srcFind || '/assets/images/icons/coins-icons/default-coin.svg'}
            width={20}
            height={20}
            effect="blur"
            alt={`default-coin${randomNumber()}`}
            wrapperClassName="swap-currency__single-image"
            wrapperProps={{ style: { display: 'flex' } }}
          />
          <span className="swap-currency__label">{currencyState?.label}</span>
          <span className="swap-currency__network">
            {
              currencies?.find((item) => item?.ticker === currencyState?.value)
                ?.network
            }
          </span>
        </div>
      </div>
    );
  };

  const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    const swapCurrencyCustomOptionClass = classNames(
      'swap-currency__custom-option',
      {
        active: props.isSelected,
        focused: !props.isSelected && props.isFocused,
      }
    );

    const srcFind =
      imageList?.find((value) => value?.name === data.value.toUpperCase())
        ?.src || null;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={swapCurrencyCustomOptionClass}
      >
        <div className="swap-currency__custom-option-container">
          <LazyLoadImage
            src={srcFind || '/assets/images/icons/coins-icons/default-coin.svg'}
            width={15}
            height={15}
            effect="blur"
            alt={`default-coin${randomNumber()}`}
            wrapperClassName="swap-currency__custom-option-image"
            wrapperProps={{ style: { display: 'flex' } }}
          />
          <span className="swap-currency__custom-option-label">
            {data.label}
          </span>
          <span className="swap-currency__custom-option-network">
            {data.network}
          </span>
        </div>
        <span className="swap-currency__custom-option-description">
          {data.description}
        </span>
      </div>
    );
  };

  return (
    <article className={`swap-currency`}>
      <div className="swap-currency__sum">
        <span className="swap-currency__method">{method}</span>
        {loading ? (
          <Loader />
        ) : (
          <input
            className="swap-currency__input"
            onInput={handleCurrencyInput}
            id={id}
            name={id}
            value={amountCurrency}
            type="text"
            pattern="[0-9]*"
            disabled={disabledInput || false}
            autoComplete={'off'}
          />
        )}
      </div>
      <div className="swap-currency__select">
        <Select
          isDisabled={disabledSelect}
          options={options || []}
          classNamePrefix={'swap-currency'}
          value={currencyState || null}
          onChange={changeCurrencySelect}
          name={'selectCurrency'}
          placeholder={false}
          isSearchable={true}
          components={{
            Option: CustomOption,
            ValueContainer: CustomValueContainer,
          }}
        />
      </div>
    </article>
  );
};

export default SwapCurrency;
