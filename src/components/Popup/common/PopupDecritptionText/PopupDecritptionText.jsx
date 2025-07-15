import './popup-description-text.scss';
import classNames from 'classnames';

const PopupDecritptionText = ({ text, id, className = '' }) => {
  return (
    <span id={id} className={classNames('popup-description-text ', className)}>
      {text}
    </span>
  );
};

export default PopupDecritptionText;
