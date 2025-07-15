import StatusText from '../StatusText/StatusText';
import './status-container.scss';

const StatusContainer = (props) => {
  const { id, amount, label, network } = props;
  return (
    <div className="status-container">
      <StatusText id={id} text={amount + ' ' + label} />
      <span className="status-container__network">{network}</span>
    </div>
  );
};

export default StatusContainer;
