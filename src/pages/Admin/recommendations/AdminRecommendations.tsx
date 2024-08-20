import { useQuery } from "@tanstack/react-query";
import styles from "../Admin.module.scss";
import { Loader } from "../../../components/UI/Loader/Loader";
import { AdminDataTable } from "../AdminDataTable";
import { adminApiService } from "../../../api/entities/admin/admin.api";

export function AdminRecommendations() {
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => adminApiService.getRecommendations(),
  });
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Рекомендации</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.recommendations}>
          {data && <AdminDataTable data={data?.data} />}
        </div>
      )}
    </div>
  );
}
