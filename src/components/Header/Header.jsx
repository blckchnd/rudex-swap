import './header.scss';
import BurgerButton from '@components/shared/Buttons/BurgerButton/BurgerButton';
import { Link } from 'react-router-dom';

const Header = ({ handleClickMenuBarButton, locales, title = true }) => {
  return (
    <header className={`header`}>
      <div className={'header__wrapper'}>
        <Link to={'/'} className="header__logo" />
        {title ? <h1 className="header__title">{locales?.HEADER}</h1> : ''}

        <BurgerButton onClick={handleClickMenuBarButton} />
      </div>
    </header>
  );
};

export default Header;
