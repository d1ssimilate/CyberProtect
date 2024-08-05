import { useQuery } from "@tanstack/react-query";
import styles from "../Admin.module.scss";
import { Loader } from "../../../components/UI/Loader/Loader";
import { AdminDataTable } from "../AdminDataTable";
import { useContext, useEffect, useState } from "react";
import { TRecommendationRequestData } from "../../../api/entities/recommendation/recommendation.types";
import { DialogContext } from "../../../components/Providers/DialogProvier/DialogProvider";
import { adminApiService } from "../../../api/entities/admin/admin.api";

export function AdminRecommendations() {
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => adminApiService.getRecommendations(),
  });
  const { setDialog } = useContext(DialogContext);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<TRecommendationRequestData>({ id: 0, description: "", title: "" });
  useEffect(() => {
    if (selectedRecommendation.description || selectedRecommendation.title)
      setDialog("RecommendationEdit", "Редактирование", selectedRecommendation);
  }, [selectedRecommendation]);
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Рекомендации</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.recommendations}>
          {data && (
            <AdminDataTable
              setSelectedItem={setSelectedRecommendation}
              data={data?.data}
            />
          )}
        </div>
      )}
    </div>
  );
}
