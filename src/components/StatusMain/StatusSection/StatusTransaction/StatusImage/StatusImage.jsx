import { useEffect, useState } from 'react';
import './status-image.scss';
import useWindowWidth from '@components/utils/hooks/useWindowWidth';
import { changeStatusName, mediaMinTablet } from '@components/utils/utils';
import { Loader } from '@components/shared/Loader/Loader';
import { STATUS, STATUS_CLASS, statusArrya } from '../../../constant';

const StatusImage = ({ locales, exchangeTransaction }) => {
  const windowWidth = useWindowWidth();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    checkIndex();
  }, [exchangeTransaction?.status]);

  const checkIndex = () => {
    statusArrya.find((item, index) => {
      if (item === exchangeTransaction?.status) {
        setActiveIndex(index);
      }
    });
  };

  return (
    <div className="status-image">
      {statusArrya.map((item, index) => {
        let className = 'status-image__item';

        if (windowWidth < mediaMinTablet) {
          if (exchangeTransaction?.status === item) {
            exchangeTransaction?.status === STATUS.FINISHED
              ? (className += STATUS_CLASS.COMPLITED)
              : (className += STATUS_CLASS.ACTIVE);
          } else if (index === activeIndex - 1) {
            className += STATUS_CLASS.COMPLITED;
          } else if (
            index === activeIndex + 1 &&
            exchangeTransaction?.status === STATUS.WAITING
          ) {
            className += STATUS_CLASS.UNPCOMING;
          } else {
            className += STATUS_CLASS.HIDDEN;
          }
        } else {
          if (index === activeIndex) {
            exchangeTransaction?.status === STATUS.FINISHED
              ? (className += STATUS_CLASS.COMPLITED)
              : (className += STATUS_CLASS.ACTIVE);
          } else if (index < activeIndex) {
            className += STATUS_CLASS.COMPLITED;
          } else {
            className += STATUS_CLASS.UNPCOMING;
          }
        }

        return (
          <div key={index} className={className}>
            {className.includes(STATUS_CLASS.ACTIVE) ? (
              <Loader className={'status-image__loader'} color="white" />
            ) : (
              ''
            )}
            <span className="status-image__text">
              {changeStatusName({ name: item, locales: locales })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusImage;
