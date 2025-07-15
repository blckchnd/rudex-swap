import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import './input.scss';
import classNames from 'classnames';

const InputHidden = ({
  label,
  handleInput,
  input,
  placeholder = '',
  idName = 'text',
  type = 'text',
  classWrapper = '',
  required = false,
}) => {
  const name = `input-${idName}`;

  const [isVisible, setIsVisible] = useState(false);

  const handleClickOpenInput = () => {
    setIsVisible(!isVisible);
  };

  const classLabel = isVisible ? 'input__label_open' : '';

  return (
    <div className={classNames('input', classWrapper)}>
      <label
        htmlFor={name}
        className={classNames('input__label input__label_button', classLabel)}
        onClick={handleClickOpenInput}
      >
        {label} {required && <span className="input__required">*</span>}
      </label>
      <AnimatePresence>
        {isVisible ? (
          <motion.input
            className={'input__fields'}
            onInput={handleInput}
            id={name}
            name={name}
            value={input}
            type={type}
            placeholder={placeholder}
            autoComplete={'off'}
            initial={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
            animate={{ opacity: 1, height: '100%', padding: 10 }}
            exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
            transition={{ duration: 0.4 }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default InputHidden;
