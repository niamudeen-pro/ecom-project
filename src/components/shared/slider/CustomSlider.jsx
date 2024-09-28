import { Swiper } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

export default function CustomSlider({
  children,
  breakpoints = {
    768: {
      slidesPerView: 3,
    },
    550: {
      slidesPerView: 2,
    },
  },
}) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      initialSlide={2}
      centeredSlides={true}
      slidesPerView={1}
      loop={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
        disabledClass: "swiper-button-disabled",
      }}
      breakpoints={breakpoints}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="deals-swiper"
    >
      {children}
    </Swiper>
  );
}
