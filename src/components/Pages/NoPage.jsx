import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import MenuBar from '@components/MenuBar/MenuBar';
import Button from '@components/shared/Buttons/Button/Button';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const NoPage = ({ locales, menuBarStatus, handleClickMenuBarButton }) => {
  const navigate = useNavigate();

  const handleClickBackHome = () => {
    navigate('/');
  };

  return (
    <Fragment>
      <Header
        handleClickMenuBarButton={handleClickMenuBarButton}
        locales={locales}
        title={false}
      />
      <section className="notfound">
        <h1 className="notfound__title">404</h1>
        <span className="notfound__subtitle">
          {locales?.PAGE_NOT_FOUND?.TITLE}
        </span>
        <Button
          text={locales?.PAGE_NOT_FOUND?.BUTTON}
          onClick={handleClickBackHome}
          className={'swap-rates__button'}
        />
      </section>
      <Footer locales={locales} />
      <MenuBar
        menuBarStatus={menuBarStatus}
        handleClickMenuBarButton={handleClickMenuBarButton}
        locales={locales}
      />
    </Fragment>
  );
};

export default NoPage;
