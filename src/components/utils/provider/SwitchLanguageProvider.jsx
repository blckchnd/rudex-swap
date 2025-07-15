import { createContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

export const SwitchLanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const localLanguage = localStorage.getItem('language');
    localLanguage ? setLanguage(localLanguage) : setLanguage('en');
  }, []);

  useEffect(() => {
    document.documentElement.dataset.languge = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
