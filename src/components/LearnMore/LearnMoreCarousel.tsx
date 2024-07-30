import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import styles from "./LearnMore.module.scss";
import { Image } from "primereact/image";
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
        effect={"creative"}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: true }}
        creativeEffect={{
          prev: {
            translate: ["-120%", 0, -500],
          },
          next: {
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative, Autoplay]}
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx}>
            <LearnMoreCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
