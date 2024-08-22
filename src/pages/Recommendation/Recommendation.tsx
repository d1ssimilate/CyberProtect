import { useQuery } from "@tanstack/react-query";
import styles from "./Recommendation.module.scss";
import { recommendationApiService } from "../../api/entities/recommendation/recommendation.api";
import { Image } from "primereact/image";
import { url } from "../../api/instance";
import { Fragment } from "react/jsx-runtime";

export function RecommendationPage({ number }: { number: string }) {
  const { data: queryData } = useQuery({
    queryKey: ["recommendation"],
    queryFn: () => recommendationApiService.getRecommendations(),
  });
  const data = queryData?.data.find((item) => item.id === Number(number));

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.title}>{data?.title}</h2>
      <div className={styles.content}>{data?.description}</div>
      {data?.attachments &&
        data.attachments.map((item, idx) => (
          <Fragment key={idx}>
            {item.type === "image" ? (
              <Image
                style={{ width: "fit-content" }}
                preview={true}
                src={`${url}${item.url}`}
              />
            ) : item.type === "video" ? (
              <video src={`${url}${item.url}`} controls />
            ) : (
              <span style={{ color: "var(--deep-blue)" }}>{item.label}</span>
            )}
          </Fragment>
        ))}
    </div>
  );
}
