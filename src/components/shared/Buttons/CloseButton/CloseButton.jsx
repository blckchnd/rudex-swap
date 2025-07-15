import classNames from 'classnames';
import './close-button.scss';

const CloseButton = ({ handleClickButton, className = '' }) => {
  return (
    <button
      className={classNames('close-button', className)}
      type="button"
      onClick={handleClickButton}
      aria-label={'close button'}
    ></button>
  );
};

export default CloseButton;
