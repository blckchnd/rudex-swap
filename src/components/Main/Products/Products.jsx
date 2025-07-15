import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import './product.scss';

import Slide from './Slide/Slide';
import useWindowWidth from '@components/utils/hooks/useWindowWidth';
import { mediaMaxWidth, mediaMinTablet } from '@components/utils/utils';

const Products = ({ locales }) => {
  const windowWidth = useWindowWidth();
  const slidesPerView =
    windowWidth < mediaMinTablet ? 1 : windowWidth < mediaMaxWidth ? 2 : 3;

  return (
    <section className="products" id="products">
      <h2 className="products__title">{locales?.PRODUCTS?.TITLE}</h2>
      <Swiper
        className="products__swapper"
        grabCursor={true}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        scrollbar={{
          hide: false,
          horizontalClass: 'scroll-bar',
          dragClass: 'swiper-scrollbar-drag',
        }}
        navigation
        modules={[Scrollbar, Navigation]}
      >
        {locales?.PRODUCTS?.ITEMS?.map((item, index) => {
          return (
            <SwiperSlide key={`swapper-${index}`}>
              <Slide item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Products;
