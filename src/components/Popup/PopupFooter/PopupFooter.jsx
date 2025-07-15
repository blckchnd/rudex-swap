import './popup-footer.scss';
import classNames from 'classnames';

const PopupFooter = ({ children, className = '' }) => {
  return (
    <footer className={classNames('popup-footer', className)}>
      {children}
    </footer>
  );
};

export default PopupFooter;
