import Link from '@components/shared/Link/Link';
import './footer.scss';
import { localiztionHelper } from '@components/utils/utils';
import classNames from 'classnames';

const Footer = ({ locales, swapButton }) => {
  const date = new Date();

  const footerClass = classNames('footer', {
    active: swapButton,
  });

  return (
    <footer className={footerClass}>
      <div className="footer__wrapper">
        <ul className="footer__links">
          {locales?.FOOTER?.ITEMS.map((item, index) => {
            return (
              <Link
                key={`footer${index}`}
                className={classNames('footer__link', item?.CLASS)}
                href={item?.LINK}
                name={item?.TITLE}
                target={item?.TARGET || '_blank'}
              />
            );
          })}
        </ul>
        <div className="footer__info">
          <Link
            className={'footer__link agreement'}
            href={locales?.FOOTER?.AGREEMENT?.LINK}
            name={locales?.FOOTER?.AGREEMENT?.TEXT}
          />
          <span className="footer__copy">
            {localiztionHelper({
              str: locales?.FOOTER?.COPY,
              params: {
                year: date.getFullYear(),
              },
            })}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
