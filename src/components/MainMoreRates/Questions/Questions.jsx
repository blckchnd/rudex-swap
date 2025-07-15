import './questions.scss';
import QuestionsItem from './QuestionsItem/QuestionsItem';

const Questions = ({ locales }) => {
  return (
    <section className="questions">
      <div className="questions__wrapper">
        <h2 className="questions__title">{locales?.QUESTIONS?.TITLE}</h2>
        <ul className="questions__items">
          {locales?.QUESTIONS?.ITEMS?.map((item, index) => {
            return <QuestionsItem key={`question${index}`} item={item} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Questions;
