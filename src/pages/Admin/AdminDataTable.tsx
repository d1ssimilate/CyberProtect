import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "./Admin.module.scss";

import { TRecommendationRequestData } from "../../api/entities/recommendation/recommendation.types";
import { useContext } from "react";
import { DialogContext } from "../../components/Providers/DialogProvier/DialogProvider";

interface AdminDataTableProps {
  data: TRecommendationRequestData[];
}

export function AdminDataTable(props: AdminDataTableProps) {
  const { setDialog } = useContext(DialogContext);
  return (
    <DataTable
      value={props.data}
      className={styles.table}
      selectionMode="single"
      onSelectionChange={(e) =>
        setDialog("RecommendationEdit", "Редактирование", e.value, styles.edit)
      }
      dataKey="id"
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column field="id" header="ID"></Column>
      <Column field="title" header="Заголовок"></Column>
      <Column field="description" header="Описание"></Column>
    </DataTable>
  );
}
