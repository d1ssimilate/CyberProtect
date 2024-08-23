import { Fragment, useContext, useEffect } from "react";
import styles from "./Recommendations.module.scss";
import { DialogContext } from "../../Providers/DialogProvier/DialogProvider";
import {
  TRecommendationRequestData,
  TRecommendationViewDtoRequest,
} from "../../../api/entities/recommendation/recommendation.types";
import { url } from "../../../api/instance";
import { Image } from "primereact/image";
import { Link } from "@tanstack/react-router";
import { useCookie } from "../../../hooks/useCookie";
import { recommendationApiService } from "../../../api/entities/recommendation/recommendation.api";
import { useMutation } from "@tanstack/react-query";
import { RecommendationShare } from "./RecommendationShare";

export function RecommendationDialog() {
  const { data: ContextData } = useContext(DialogContext);

  const data = ContextData as TRecommendationRequestData;
  const { getCookie } = useCookie();
  const accessToken = getCookie("accessToken");
  const email = localStorage.getItem("email");

  const { mutate } = useMutation({
    mutationFn: (params: TRecommendationViewDtoRequest) =>
      recommendationApiService.postRecommendationCreateView({ params }),
  });

  useEffect(() => {
    if (email && data) {
      mutate({ email: email, id: data.id });
    }
  }, [accessToken, data]);

  return (
    <div className={styles.content}>
      <p className={styles.description}>{data.description}</p>
      {data.attachments &&
        data.attachments.map((item, idx) => {
          const fileUrl = `${url}${item.url}`;
          return (
            <Fragment key={idx}>
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
            </Fragment>
          );
        })}
      {data.isLongRead && (
        <Link className={styles.link} to={`/recommendation/${data.id}`}>
          Подробнее
        </Link>
      )}
      <RecommendationShare data={data} />
    </div>
  );
}
