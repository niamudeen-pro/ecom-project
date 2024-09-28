import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SLIDES_MENU } from "../constants";

export default function LogoSlider() {
  return (
    <section className="customContainer py-28">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          1280: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          550: {
            slidesPerView: 2,
          },
        }}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {SLIDES_MENU.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div className="flex justify-center sm:justify-start">
              <img src={slide.img} alt={slide.name} className="w-[19rem]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
