import classNames from 'classnames';
import './input.scss';

const Input = ({
  label,
  handleInput,
  input,
  placeholder = '',
  idName = 'text',
  type = 'text',
  classWrapper = '',
  classLabel = '',
  classFields = '',
  required = false,
}) => {
  const name = `input-${idName}`;

  return (
    <div className={classNames('input', classWrapper)}>
      <label htmlFor={name} className={classNames('input__label', classLabel)}>
        {label} {required && <span className="input__required">*</span>}
      </label>
      <input
        className={classNames('input__fields', classFields)}
        onInput={handleInput}
        id={name}
        name={name}
        value={input}
        type={type}
        placeholder={placeholder}
        autoComplete={'off'}
      />
    </div>
  );
};

export default Input;
