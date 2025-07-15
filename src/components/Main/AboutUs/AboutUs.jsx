import './aboutus.scss';

const AboutUs = ({ locales }) => {
  return (
    <section className="aboutus" id="aboutus">
      <div className="aboutus__wrapper">
        <h2 className="aboutus__title">{locales?.ABOUT_US?.TITLE}</h2>
        <p className="aboutus__description">{locales?.ABOUT_US?.DESCRIPTION}</p>
      </div>
    </section>
  );
};

export default AboutUs;
