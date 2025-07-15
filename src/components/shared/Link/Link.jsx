import classNames from 'classnames';
import './link.scss';

const Link = ({ className, href, name, target = '_blank' }) => {
  return (
    <a
      className={classNames('link', className)}
      href={href}
      target={target}
      rel="noreferrer"
    >
      {name}
    </a>
  );
};

export default Link;
