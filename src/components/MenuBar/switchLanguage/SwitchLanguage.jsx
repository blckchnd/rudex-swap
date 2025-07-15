import SwitchLanguageButton from './SwitchLanguageButton';

const SwitchLanguage = () => {
  return (
    <div className="switch-language">
      <SwitchLanguageButton name={'ru'} />
      <span className="switch-language__span">/</span>
      <SwitchLanguageButton name={'en'} />
      <span className="switch-language__span">/</span>
      <SwitchLanguageButton name={'es'} />
    </div>
  );
};

export default SwitchLanguage;
