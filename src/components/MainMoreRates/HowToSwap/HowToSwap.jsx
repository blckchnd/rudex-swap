import Button from '@components/shared/Buttons/Button/Button';
import './hts.scss';
import { localiztionHelper, scrollTop } from '@components/utils/utils';

const HowToSwap = (props) => {
  const { locales, recieveCur, depositCur } = props;

  const handleClickButton = () => {
    scrollTop();
  };

  return (
    <section className="hts">
      <div className="hts__wrapper">
        <h2 className="hts__title">
          {localiztionHelper({
            str: locales?.HOW_TO_SWAP?.TITLE,
            params: {
              deposit: depositCur?.label,
              depositNetwork: depositCur?.network,
              receive: recieveCur?.label,
              receiveNetwork: recieveCur?.network,
            },
          })}
        </h2>
        <span className="hts__subtitle">
          {localiztionHelper({
            str: locales?.HOW_TO_SWAP?.SUBTITLE.FIRST,
            params: {
              deposit: depositCur?.label,
              depositNetwork: {
                value: depositCur?.network,
                className: 'hts__network',
              },
              receive: recieveCur?.label,
              receiveNetwork: {
                value: recieveCur?.network,
                className: 'hts__network',
              },
            },
          })}
          <br />

          {locales?.HOW_TO_SWAP?.SUBTITLE?.SECOND}
        </span>
        <ol className="hts__items">
          {locales?.HOW_TO_SWAP?.ITEMS?.map((item, index) => {
            return (
              <li key={`hts-item${index}`} className="hts__item">
                {index + 1 + '. '}
                {localiztionHelper({
                  str: item?.ITEM,
                  params: {
                    deposit: depositCur?.label,
                    depositNetwork: {
                      value: depositCur?.network,
                      className: 'hts__network',
                    },
                    receive: recieveCur?.label,
                    receiveNetwork: {
                      value: recieveCur?.network,
                      className: 'hts__network',
                    },
                  },
                })}
              </li>
            );
          })}
        </ol>
        <Button
          form={'check-status-form'}
          text={locales?.HOW_TO_SWAP?.BUTTON}
          className={'hts__button'}
          onClick={handleClickButton}
          color={'white'}
        />
      </div>
    </section>
  );
};

export default HowToSwap;
