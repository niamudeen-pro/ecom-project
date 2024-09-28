import { SwiperSlide } from "swiper/react";
import NavigationButton from "../shared/slider/NavigationButton";
import CustomSlider from "../shared/slider/CustomSlider";
import TestmonialCard from "./Card";
import SectionText from "../shared/SectionText";
import { COMMON_SLIDES } from "../../constants";

export default function TestimonialSection() {
  return (
    <section className="bg-gray-50 relative py-10">
      <div className="section customContainer  space-y-10">
        <SectionText
          title="This Is What Our Customers Say"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis"
          textDirection="CENTER"
        />

        {/* slider section */}
        <div>
          <CustomSlider
            breakpoints={{
              1040: {
                slidesPerView: 3,
              },
            }}
          >
            {COMMON_SLIDES.slice(0, 3).map((slide) => (
              <SwiperSlide key={slide.id}>
                <TestmonialCard slide={slide} />
              </SwiperSlide>
            ))}
          </CustomSlider>
        </div>
      </div>
      <NavigationButton />
    </section>
  );
}
