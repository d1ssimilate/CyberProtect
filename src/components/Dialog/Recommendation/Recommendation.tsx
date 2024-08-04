import { useContext } from "react";
import styles from "./Recommendations.module.scss";
import { DialogContext } from "../../DialogProvier/DialogProvider";
import { TRecommendationRequestData } from "../../../api/entities/recommendation/recommendation.types";

export function RecommendationDialog() {
  const { data: ContextData } = useContext(DialogContext);
  const data = ContextData as TRecommendationRequestData;

  return (
    <div className={styles.content}>
      <p className={styles.description}>{data.description}</p>
    </div>
  );
}
