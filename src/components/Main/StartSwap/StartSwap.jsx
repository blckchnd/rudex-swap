import './start-swap.scss';
import { useNavigate } from 'react-router-dom';
import Button from '@components/shared/Buttons/Button/Button';

const StartSwap = ({ locales }) => {
  const navigate = useNavigate();

  const handleClickMore = () => {
    navigate('/more-rates');
  };

  return (
    <section className="start-swap" id="start-swap">
      <div className="start-swap__wrapper">
        <div className="start-swap__container">
          <h2 className="start-swap__title">{locales?.START_SWAP?.TITLE}</h2>
          <span className="start-swap__subtitle">
            {locales?.START_SWAP?.SUBTITLE}
          </span>
        </div>
        <Button
          text={locales?.START_SWAP?.BUTTON}
          onClick={handleClickMore}
          color="white"
        />
      </div>
    </section>
  );
};

export default StartSwap;
