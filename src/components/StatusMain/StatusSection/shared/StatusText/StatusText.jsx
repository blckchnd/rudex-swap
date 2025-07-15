import classNames from 'classnames';
import './status-text.scss';

const StatusText = ({ text, id, className = '' }) => {
  return (
    <span id={id} className={classNames('status-text', className)}>
      {text}
    </span>
  );
};

export default StatusText;
