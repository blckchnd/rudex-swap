import './slide.scss';

const Slide = ({ item }) => {
  return (
    <a className="slide" href={item.LINK} target={'_blank'} rel="noreferrer">
      <img
        className="slide__img"
        src={`/assets/images/products/${item?.IMG}.png`}
        alt={`picture ${item?.TITLE}`}
      />
      <div className="slide__container">
        <h3 className="slide__title">{item?.TITLE}</h3>
        <span className="slide__subtitle">{item?.SUBTITLE}</span>
      </div>
      <button type="button" className="slide__link" />
    </a>
  );
};

export default Slide;
