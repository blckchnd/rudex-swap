import { useEffect } from 'react';
import { STATUS } from '../constant';
import './active-number.scss';
import classNames from 'classnames';

const ActiveNumber = ({
  item,
  name,
  activeIndex,
  index,
  locales,
  progress,
  setProgress,
}) => {
  const activeNumberClass = classNames(
    'active-number',
    activeIndex >= index ? STATUS.ACTIVE : STATUS.WAIT,
    {
      last: index === locales?.HOW_IT_WORKS?.ITEMS.length - 1,
    }
  );

  useEffect(() => {
    let interval;

    if (progress[activeIndex] < 100) {
      interval = setInterval(() => {
        setProgress((prevState) => {
          if (prevState[activeIndex] < 100 && activeIndex === index) {
            const newState = [...prevState];
            newState[activeIndex] += 1;
            return newState;
          } else {
            clearInterval(interval);
            return prevState;
          }
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [progress, activeIndex]);

  useEffect(() => {
    if (
      activeIndex === locales?.HOW_IT_WORKS?.ITEMS.length - 1 &&
      progress[progress.length - 1] === 100
    ) {
      setProgress([0, 0, 0, 0, 0]);
    }
  }, [activeIndex, progress]);

  return (
    <article className={activeNumberClass}>
      <div className="active-number__circle" data-number={name} />
      <div className="active-number__element">
        <div
          style={{ width: progress[index] + '%' }}
          className="active-number__progress"
        />
      </div>
      <h3 className="active-number__title">{item?.TITLE}</h3>
      <span className="active-number__subtitle">{item?.SUBTITLE}</span>
    </article>
  );
};

export default ActiveNumber;
