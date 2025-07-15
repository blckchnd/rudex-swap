import classNames from 'classnames';
import './button.scss';

const Button = ({
  type = 'button',
  form = '',
  text,
  className,
  onClick,
  disabledButton = false,
  color = '',
}) => {
  const colorButton = color === 'white' ? 'white' : '';

  return (
    <button
      disabled={disabledButton}
      className={classNames('button', className, colorButton)}
      onClick={onClick}
      type={type}
      form={form}
    >
      {text}
    </button>
  );
};

export default Button;
