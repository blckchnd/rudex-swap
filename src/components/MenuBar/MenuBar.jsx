import CloseButton from '@components/shared/Buttons/CloseButton/CloseButton';
import SwitchTheme from './switchTheme/SwitchTheme';
import Link from '@components/shared/Link/Link';
import SwitchLanguage from './switchLanguage/SwitchLanguage';
import { useEffect, useRef } from 'react';
import './menubar.scss';
import { clickOverlay } from '@components/utils/utils';
import classNames from 'classnames';

const MenuBar = ({ menuBarStatus, handleClickMenuBarButton, locales }) => {
  const pannel = useRef(null);

  useEffect(() => {
    clickOverlay({
      classActive: 'active',
      activeType: menuBarStatus,
      handleFunc: handleClickMenuBarButton,
    });
  }, [menuBarStatus]);

  const menubarClass = classNames('menubar', { active: menuBarStatus });

  return (
    <section className={menubarClass}>
      <nav ref={pannel} className="menubar__panel">
        <div className="menubar__buttons">
          <SwitchTheme />
          <CloseButton handleClickButton={handleClickMenuBarButton} />
        </div>
        <ul className="menubar__links">
          {locales?.MENU_BAR?.map((item, index) => {
            return (
              <li key={`menubar-${index}`} className="menubar__link">
                <Link
                  className="menubar__text"
                  href={item?.LINK}
                  name={item?.TITLE}
                  target={item?.TARGET}
                />
              </li>
            );
          })}
          <SwitchLanguage />
        </ul>
      </nav>
    </section>
  );
};

export default MenuBar;
