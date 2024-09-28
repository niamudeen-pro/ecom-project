import { SwiperSlide } from "swiper/react";
import NavigationButton from "../shared/slider/NavigationButton";
import CustomSlider from "../shared/slider/CustomSlider";
import SectionText from "../shared/SectionText";
import { COMMON_SLIDES } from "../../constants";

export default function DealsSection() {
  return (
    <section id="deals" className="bg-gray-50 section relative">
      <div className="customContainer grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* content section */}
        <div className="flexCenter !justify-start">
          <SectionText
            title="Deals of the month"
            desc="Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not only five
              centuries, but also the leap into elec"
            btnText="Buy now"
          />
        </div>

        {/* slides section */}
        <div>
          <CustomSlider>
            {COMMON_SLIDES.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="h-[50rem] w-[30rem]">
                  <img src={slide.img} alt="Slide" className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </CustomSlider>
        </div>
      </div>
      {/* navigation buttons section */}
      <NavigationButton />
    </section>
  );
}
