import styles from "./Recommendation.module.scss";

export function RecommendationPage({ number }: { number: string }) {
  console.log(number);

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.title}>
        Что может угрожать вашим данным и какие методы используют
        злоумышленники?
      </h2>
      <div className={styles.content}>
        Цифровая среда предоставляет злоумышленникам много возможностей для
        доступа к вам и вашим данным посредством:
      </div>
    </div>
  );
}
