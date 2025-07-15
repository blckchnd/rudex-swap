import './check-status-text.scss';
import classNames from 'classnames';

const CheckStatusText = ({ type, result, classType = '' }) => {
  return (
    <article className={classNames('check-status-text', classType)}>
      <span className={classNames('check-status-text__type', classType)}>
        {type}
      </span>
      <span className={`check-status-text__result`}>{result}</span>
    </article>
  );
};

export default CheckStatusText;
