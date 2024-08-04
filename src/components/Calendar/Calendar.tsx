import { useRef } from "react";
import { Recommendation } from "../Recommendation/Recommendation";
import styles from "./Calendar.module.scss";
import { Masonry } from "../Masonry/Masonry";
import { useQuery } from "@tanstack/react-query";
import { recommendationApiService } from "../../api/entities/recommendation/recommendation.api";
import { Loader } from "../Loader/Loader";
import { getImages } from "../../utils/getImages";

export function Calendar() {
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => recommendationApiService.getRecommendations(),
  });
  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const recommendationItems = (() => {
    if (data) {
      const lastId = data.data.length ? data.data[data.data.length - 1].id : 0;
      const items = data.data.map((item, idx) => {
        const isOdd = (idx + 1) % 2 !== 0;
        const imageIndex = ((idx - (idx % 2)) / 2) % getImages().length;
        return (
          <>
            {isOdd && (
              <img className={styles.toy} src={getImages()[imageIndex]} />
            )}
            <Recommendation active={true} key={idx} item={item} />
          </>
        );
      });

      const additionalItems = Array.from(
        { length: getDaysInMonth(new Date()) - data.data.length },
        (_, idx) => {
          const id = lastId + idx + 1;
          const isOdd = (items.length + idx + 1) % 2 !== 0;
          const imageIndex =
            ((items.length + idx - ((items.length + idx) % 2)) / 2) %
            getImages().length;
          return (
            <>
              {isOdd && (
                <img className={styles.toy} src={getImages()[imageIndex]} />
              )}
              <Recommendation key={idx} item={{ id }} />
            </>
          );
        }
      );
      return [...items, ...additionalItems];
    } else {
      return Array.from({ length: getDaysInMonth(new Date()) }, (_, idx) => {
        const isOdd = (idx + 1) % 2 !== 0;
        const imageIndex = ((idx - (idx % 2)) / 2) % getImages().length;
        return (
          <>
            {isOdd && (
              <img className={styles.toy} src={getImages()[imageIndex]} />
            )}
            <Recommendation key={idx} item={{ id: idx + 1 }} />
          </>
        );
      });
    }
  })();

  return (
    <div ref={containerRef} className={`container ${styles.calendar}`}>
      <h2 className={styles.title}>
        Адвент-календарь
        <br />
        2024
      </h2>
      {isLoading ? <Loader /> : <Masonry items={recommendationItems}></Masonry>}
    </div>
  );
}
