import classNames from 'classnames';
import './loader.scss';

export const Loader = ({ size = '', className = '', color = '' }) => {
  const loaderClass = classNames('loader', className, {
    loader_l: size === 'l',
    loader_m: size === 'm',
    loader_white: color === 'white',
  });

  return <div className={loaderClass}></div>;
};
