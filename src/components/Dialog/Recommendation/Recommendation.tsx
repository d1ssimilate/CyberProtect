import { useContext } from "react";
import styles from "./Recommendations.module.scss";
import { DialogContext } from "../../Providers/DialogProvier/DialogProvider";
import { TRecommendationRequestData } from "../../../api/entities/recommendation/recommendation.types";
import { url } from "../../../api/instance";
import { Image } from "primereact/image";

export function RecommendationDialog() {
  const { data: ContextData } = useContext(DialogContext);
  const data = ContextData as TRecommendationRequestData;

  return (
    <div className={styles.content}>
      <p className={styles.description}>{data.description}</p>
      {data.attachments &&
        data.attachments.map((item) => {
          const fileUrl = `${url}${item.url}`;
          return (
            <>
              {item.type === "image" ? (
                <Image
                  className={styles.img}
                  preview={true}
                  alt={item.label}
                  src={fileUrl}
                />
              ) : item.type === "video" ? (
                <video src={fileUrl} controls />
              ) : (
                <span style={{ color: "var(--deep-blue)", fontSize: "18px" }}>
                  {item.label}
                </span>
              )}
            </>
          );
        })}
    </div>
  );
}
