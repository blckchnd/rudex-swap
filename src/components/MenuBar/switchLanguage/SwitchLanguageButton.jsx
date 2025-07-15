import { useContext } from 'react';
import './switch-language.scss';
import { LanguageContext } from '@components/utils/provider/SwitchLanguageProvider';
import classNames from 'classnames';

const SwitchLanguageButton = ({ name }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleClickButton = () => {
    localStorage.setItem('language', name);
    setLanguage(name);
  };

  const switchLanguageButton = classNames('switch-language__button', {
    active: language === name,
  });

  return (
    <button
      className={switchLanguageButton}
      type="button"
      onClick={handleClickButton}
    >
      {name}
    </button>
  );
};

export default SwitchLanguageButton;
