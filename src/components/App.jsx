import './app.scss';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { locales } from '@locales/locales';
import { LanguageContext } from '@components/utils/provider/SwitchLanguageProvider';
import axiosRequest from '@components/utils/hooks/axiosRequestHook';
import MainPage from '@components/Pages/MainPage';
import MoreRatesPage from '@components/Pages/MoreRatesPage';
import NoPage from '@components/Pages/NoPage';
import StatusPage from './Pages/StatusPage';
import { Helmet } from 'react-helmet';

function App() {
  const { language } = useContext(LanguageContext);

  const localesLanguage = locales[language.toUpperCase()] || locales.EN;

  const [currencies, setCurrencies] = useState([]);
  const [menuBarStatus, setMenuBarStatus] = useState(false);

  const handleClickMenuBarButton = () => {
    setMenuBarStatus(!menuBarStatus);
  };

  const getCurrencies = (data) => {
    setCurrencies(data);
  };

  useEffect(() => {
    axiosRequest({
      method: 'GET',
      url: 'currencies?showTickerNetwork=true',
      callback: getCurrencies,
    });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>{localesLanguage.HELMET.TITLE}</title>
        <meta name="description" content={localesLanguage.HELMET.DESCRIPTION} />
        <meta property="og:title" content={localesLanguage.HELMET.TITLE} />
        <meta
          property="og:description"
          content={localesLanguage.HELMET.DESCRIPTION}
        />
        <meta name="twitter:title" content={localesLanguage.HELMET.TITLE} />
        <meta
          name="twitter:description"
          content={localesLanguage.HELMET.DESCRIPTION}
        />
      </Helmet>
      <div className={'wrapper'}>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                locales={localesLanguage}
                handleClickMenuBarButton={handleClickMenuBarButton}
                currencies={currencies}
                menuBarStatus={menuBarStatus}
              />
            }
          />
          <Route
            path="/more-rates"
            element={
              <MoreRatesPage
                locales={localesLanguage}
                handleClickMenuBarButton={handleClickMenuBarButton}
                currencies={currencies}
                menuBarStatus={menuBarStatus}
              />
            }
          />
          <Route
            path="/status"
            element={
              <StatusPage
                locales={localesLanguage}
                handleClickMenuBarButton={handleClickMenuBarButton}
                currencies={currencies}
                menuBarStatus={menuBarStatus}
              />
            }
          />
          <Route
            path="*"
            element={
              <NoPage
                locales={localesLanguage}
                handleClickMenuBarButton={handleClickMenuBarButton}
                menuBarStatus={menuBarStatus}
              />
            }
          />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
