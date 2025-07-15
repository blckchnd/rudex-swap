import './burger-button.scss';

const BurgerButton = ({ onClick }) => {
  return <button className={'burger-button'} onClick={onClick} />;
};

export default BurgerButton;
