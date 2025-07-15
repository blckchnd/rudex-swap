import { useContext } from 'react';
import './switchtheme.scss';
import { SVG_Icon_Dark, SVG_Icon_Light } from '@components/utils/SVG';
import { ThemeContext } from '../../utils/provider/SwitchThemeProvider';
import classNames from 'classnames';

const SwitchTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    const changeTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', changeTheme);
    setTheme(changeTheme);
  };

  const iconDarkSvgClass = classNames(
    'switch-theme__icon',
    'switch-theme__icon_dark',
    { active: theme === 'dark' }
  );
  const iconLightSvgClass = classNames(
    'switch-theme__icon',
    'switch-theme__icon_light',
    { active: theme === 'light' }
  );
  const iconBackClass = classNames('switch-theme__icon_back', {
    'icon-light': theme === 'light',
    'icon-dark': theme !== 'light',
  });

  return (
    <label className={'switch-theme-label'} htmlFor={'switch-theme'}>
      <input
        className={`switch-theme`}
        style={{ visibility: 'hidden', position: 'absolute', zIndex: -3 }}
        checked={theme === 'dark'}
        name={'switch-theme'}
        onChange={changeTheme}
        id={'switch-theme'}
        type="checkbox"
      />
      <div className={`switch-theme-container`}>
        <SVG_Icon_Dark classSvg={iconDarkSvgClass} />
        <SVG_Icon_Light classSvg={iconLightSvgClass} />
        <div className={iconBackClass} />
      </div>
    </label>
  );
};

export default SwitchTheme;
