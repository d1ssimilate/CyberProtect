import { useQuery } from "@tanstack/react-query";
import { recommendationApiService } from "../../../api/entities/recommendation/recommendation.api";
import styles from "../Admin.module.scss";
import { Loader } from "../../../components/Loader/Loader";

export function AdminRecommendations() {
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => recommendationApiService.getRecommendationsAdmin(),
  });
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Рекомендации</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.recommendations}>
          {data?.data.map((item, idx) => (
            <div key={idx} className={styles.recommendation}>
              {item.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
