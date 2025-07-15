import { Fragment } from 'react';
import QuestionsItemText from './QuestionsItemText';
import { randomNumber } from '@components/utils/utils';

const QuestionsUnic = ({ info }) => {
  return (
    <Fragment>
      <QuestionsItemText text={info?.TEXT} />
      <ul className="questions-item__list">
        <li
          className="questions-item__text"
          dangerouslySetInnerHTML={{ __html: info?.ARRAY_ONE?.TEXT }}
        />
        <ul className="questions-item__list questions-item__list_disc">
          {info?.ARRAY_ONE?.ARRAY.map((item) => {
            return (
              <li
                key={`arrayOne${randomNumber()}`}
                className="questions-item__text"
                dangerouslySetInnerHTML={{ __html: item?.TEXT }}
              />
            );
          })}
        </ul>
      </ul>
      <QuestionsItemText text={info?.ARRAY_ONE?.TEXT_CLOSE} />
      <ul className="questions-item__list">
        {info?.ARRAY_TWO?.map((item) => {
          return (
            <li
              key={`arrayTwo${randomNumber()}`}
              className="questions-item__text"
              dangerouslySetInnerHTML={{ __html: item?.TEXT }}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default QuestionsUnic;
