import './features.scss';
import FeaturesCard from './FeaturesCard/FeaturesCard';

const Features = ({ locales }) => {
  return (
    <section className="features" id="fratures">
      <div className="features__wrapper">
        <h2 className="features__title">{locales?.FEATURES?.TITLE}</h2>
        <ul className="features__cards">
          {locales?.FEATURES?.ITEMS?.map((item, index) => {
            return <FeaturesCard key={`card-${index}`} item={item} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Features;
