import CloseButton from '@components/shared/Buttons/CloseButton/CloseButton';
import './popup-header.scss';
import classNames from 'classnames';

const PopupHeader = ({ title, handleClickButton, className = '' }) => {
  return (
    <header className={classNames('popup-header', className)}>
      <h3 className="popup-header__title">{title}</h3>
      <CloseButton
        className={'popup-header__close'}
        handleClickButton={handleClickButton}
      />
    </header>
  );
};

export default PopupHeader;
