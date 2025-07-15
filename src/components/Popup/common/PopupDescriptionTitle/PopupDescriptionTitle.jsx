import './popup-description-title.scss';
import classNames from 'classnames';

const PopupDescriptionTitle = ({ className = '', text }) => {
  return (
    <h3 className={classNames('popup-description-title', className)}>{text}</h3>
  );
};

export default PopupDescriptionTitle;
