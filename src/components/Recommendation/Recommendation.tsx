import styles from "./Recommendation.module.scss";
import { TRecommendationAttachment } from "../../api/entities/recommendation/recommendation.types";
import { useContext } from "react";
import { DialogContext } from "../Providers/DialogProvier/DialogProvider";
import { getImages } from "../../utils/getImages";

interface RecommendationProps {
  item: { id: number; title?: string; description?: string; isViewed: boolean };
  active?: boolean;
  attachments?: TRecommendationAttachment[];
}

export function Recommendation(props: RecommendationProps) {
  const isOdd = props.item.id % 2 !== 0;
  const imageIndex = props.item.id % getImages().length;
  const { setDialog } = useContext(DialogContext);
  const onClick = () => {
    if (props.active)
      setDialog("Recommendation", props.item.title, {
        ...props.item,
        number: props.item.id,
      });
  };

  const isViewed = () => {
    if (props.item?.isViewed)
      return (
        <i className={`pi pi-check ${styles.viewed__icon}`}>
          <span className={styles.viewed__text}>Просмотрено</span>
        </i>
      );
  };

  return (
    <div
      data-preview={getImages()[imageIndex]}
      onClick={onClick}
      className={`${styles.recommendation}  ${
        props.active ? styles.recommendation__active : ""
      } ${isOdd ? styles.recommendation__odd : ""}`}
    >
      <img className={styles.background} src={getImages()[imageIndex]} />
      {isViewed()}
      <span>{props.item.id}</span>
    </div>
  );
}
