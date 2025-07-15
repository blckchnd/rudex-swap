import './popup-input.scss';
import classNames from 'classnames';

const PopupInput = ({
  label,
  handleInput,
  input,
  placeholder,
  className = '',
  id,
}) => {
  return (
    <div className={classNames('popup-input', className)}>
      <label className="popup-input__label">{label}</label>
      <input
        className="popup-input__fields"
        onInput={handleInput}
        id={`popup-${id}`}
        name={`popup-${id}`}
        value={input}
        type="text"
        placeholder={placeholder}
        autoComplete={'off'}
      />
    </div>
  );
};

export default PopupInput;
