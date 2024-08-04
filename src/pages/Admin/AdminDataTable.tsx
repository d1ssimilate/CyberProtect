import { Dispatch, SetStateAction } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "./Admin.module.scss";

import { TRecommendationRequestData } from "../../api/entities/recommendation/recommendation.types";

interface AdminDataTableProps {
  data: TRecommendationRequestData[];
  setSelectedItem: Dispatch<SetStateAction<any>>;
}

export function AdminDataTable(props: AdminDataTableProps) {
  return (
    <DataTable
      value={props.data}
      className={styles.table}
      selectionMode="single"
      onSelectionChange={(e) => props.setSelectedItem(e.value)}
      dataKey="id"
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column field="id" header="ID"></Column>
      <Column field="title" header="Заголовок"></Column>
      <Column field="description" header="Описание"></Column>
    </DataTable>
  );
}
