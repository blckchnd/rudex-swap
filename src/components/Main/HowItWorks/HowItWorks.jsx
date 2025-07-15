import { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import './htw.scss';
import 'swiper/css';
import 'swiper/css/pagination';

import ActiveNumber from './ActiveNumber/ActiveNumber';
import useWindowWidth from '@components/utils/hooks/useWindowWidth';
import { mediaMinTablet } from '@components/utils/utils';
import classNames from 'classnames';

const HowItWorks = ({ locales }) => {
  const windowWidth = useWindowWidth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0, 0, 0]);

  const totalSlides = 5;
  const swiperRef = useRef(null);

  useEffect(() => {
    if (progress[activeIndex] === 100) {
      setActiveIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % totalSlides;
        return newIndex;
      });
    }
  }, [progress]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  const swiperDirection = useMemo(
    () => (windowWidth >= mediaMinTablet ? 'horizontal' : 'vertical'),
    [windowWidth]
  );

  return (
    <section className="htw" id="htw">
      <div className="htw__wrapper">
        <h2 className="htw__title">{locales?.HOW_IT_WORKS?.TITLE}</h2>
        <section className="htw__container">
          <Swiper
            autoHeight={false}
            direction={swiperDirection}
            slidesPerView={windowWidth >= mediaMinTablet ? 3 : 5}
            spaceBetween={50}
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            grabCursor={false}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {locales?.HOW_IT_WORKS?.ITEMS.map((item, index) => {
              const htwSlideClass = classNames('htw__slide', {
                swiper_active: activeIndex === index,
              });

              return (
                <SwiperSlide key={`htw-${index}`} className={htwSlideClass}>
                  <ActiveNumber
                    item={item}
                    name={index + 1}
                    activeIndex={activeIndex}
                    index={index}
                    locales={locales}
                    progress={progress}
                    setProgress={setProgress}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      </div>
    </section>
  );
};

export default HowItWorks;
