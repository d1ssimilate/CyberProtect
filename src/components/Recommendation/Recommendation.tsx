import styles from "./Recommendation.module.scss";

interface RecommendationProps {
  number: number;
  position: {
    top: number;
    left: number;
  };
}

export function Recommendation(props: RecommendationProps) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  return (
    <div
      style={{
        top: `${props.position.top}%`,
        left: `${props.position.left}%`,
      }}
      className={`${styles.recommendation} ${
        currentMonth === 11 && currentDay >= props.number
          ? styles.recommendation__active
          : ""
      }`}
    >
      {props.number}
    </div>
  );
}
