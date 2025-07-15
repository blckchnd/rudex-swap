import './questions-item.scss';
import { Fragment, useState } from 'react';
import { SVG_Icon_Triangle } from '@components/utils/SVG';
import QuestionsItemText from './QuestionsItemText';
import { randomNumber } from '@components/utils/utils';
import QuestionsUnic from './QuestionUnic';
import classNames from 'classnames';

const QuestionsItem = ({ item }) => {
  const [active, setActive] = useState(false);

  const hangleClickButton = () => {
    setActive(!active);
  };

  const questionsItemClass = classNames('questions-item', { active: active });
  const questionsItemListClass = classNames('questions-item__list', {
    [`questions-item__list_${item?.INFO?.ARRAY_CLASS}`]:
      item?.INFO?.ARRAY_CLASS,
  });

  return (
    <li className={questionsItemClass}>
      <button
        type="button"
        className="questions-item__button"
        onClick={hangleClickButton}
      >
        {item?.TITLE}
        <SVG_Icon_Triangle classSvg={'questions-item__triangle'} />
      </button>
      <div className="questions-item__container">
        {item?.TYPE === 'single' && <QuestionsItemText text={item?.TEXT} />}
        {item?.TYPE === 'array' &&
          item?.INFO?.map((array) => (
            <QuestionsItemText
              key={`itemArray${randomNumber()}`}
              text={array?.TEXT}
            />
          ))}
        {item?.TYPE === 'list' && (
          <Fragment>
            <QuestionsItemText text={item?.INFO?.TEXT} />
            <ul className={questionsItemListClass}>
              {item?.INFO?.ARRAY?.map((text) => (
                <li
                  key={`itemText${randomNumber()}`}
                  className={`questions-item__text`}
                  dangerouslySetInnerHTML={{ __html: text?.TEXT }}
                />
              ))}
            </ul>
          </Fragment>
        )}
        {item?.TYPE === 'unic' && <QuestionsUnic info={item?.INFO} />}
      </div>
    </li>
  );
};

export default QuestionsItem;
