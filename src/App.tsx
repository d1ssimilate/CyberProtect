import { Mousewheel } from "swiper/modules";
import { History } from "./components/History/History";
import { Layout } from "./components/Layout/Layout";
import "swiper/css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Calendar } from "./components/Calendar/Calendar";

function App() {
  return (
    <Layout>
      <div className="swiper-container">
        <Swiper
          mousewheel={true}
          direction={"vertical"}
          autoHeight={true}
          modules={[Mousewheel]}
        >
          <SwiperSlide>
            <History />
          </SwiperSlide>
          <SwiperSlide>
            <Calendar />
          </SwiperSlide>
        </Swiper>
      </div>
    </Layout>
  );
}

export default App;
