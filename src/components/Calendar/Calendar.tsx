import { useContext, useEffect, useRef } from "react";
import { Recommendation } from "../Recommendation/Recommendation";
import styles from "./Calendar.module.scss";
import { Masonry } from "../Masonry/Masonry";
import { useQuery } from "@tanstack/react-query";
import { recommendationApiService } from "../../api/entities/recommendation/recommendation.api";
import { Loader } from "../UI/Loader/Loader";
import { getImages } from "../../utils/getImages";
import { Route } from "../../routes/_main";
import { DialogContext } from "../Providers/DialogProvier/DialogProvider";
import { adminApiService } from "../../api/entities/admin/admin.api";

export function Calendar() {
  const { data: recommendationsData, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => recommendationApiService.getRecommendations(),
  });
  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () => adminApiService.getSettings(),
  });

  const { setDialog } = useContext(DialogContext);

  const getDaysInMonth = (date: Date) =>
    new Date(
      date.getFullYear(),
      settingsData?.data.month ?? date.getMonth() + 1,
      0
    ).getDate();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { recommendation } = Route.useSearch();

  useEffect(() => {
    if (recommendation && recommendationsData) {
      const day = recommendationsData.data.find(
        (item) => item.id === recommendation
      );
      if (day) {
        setDialog("Recommendation", day.title, {
          ...day,
          number: day.id,
        });
      }
    }
  }, [recommendation, recommendationsData]);

  const recommendationItems = (() => {
    if (recommendationsData) {
      const lastId = recommendationsData.data.length
        ? recommendationsData.data[recommendationsData.data.length - 1].id
        : 0;
      const items = recommendationsData.data.map((item, idx) => {
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
        {
          length: getDaysInMonth(new Date()) - recommendationsData.data.length,
        },
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
    <div ref={containerRef} className={`container`}>
      <div className={styles.calendar}>
        <h2 className={styles.title}>
          Адвент-календарь
          {/* <br /> */} на декабрь 2024
        </h2>
        {isLoading ? (
          <Loader />
        ) : (
          <Masonry items={recommendationItems}></Masonry>
        )}
      </div>
    </div>
  );
}
