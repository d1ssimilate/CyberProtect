import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { LearnMoreCard } from "./LearnMoreCard";

export function LearnMoreCarousel({ data }: { data: Array<any> }) {
  return (
    <div>
      <Swiper
        grabCursor={true}
        loop={true}
        slidesPerView={2}
        autoplay={{ delay: 3500, disableOnInteraction: true }}
        modules={[EffectCreative, Autoplay]}
        spaceBetween={20}
      >
        {data.map((item, idx) => (
          <SwiperSlide
            style={{ height: "unset", minHeight: "100%", display: "flex" }}
            key={idx}
          >
            <LearnMoreCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
