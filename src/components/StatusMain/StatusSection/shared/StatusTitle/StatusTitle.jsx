import classNames from 'classnames';
import './status-title.scss';

const StatusTitle = ({ className = '', text }) => {
  return <h3 className={classNames('status-title', className)}>{text}</h3>;
};

export default StatusTitle;
