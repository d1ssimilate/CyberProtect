import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "../Admin.module.scss";
import { adminApiService } from "../../../api/entities/admin/admin.api";
import { Loader } from "../../../components/UI/Loader/Loader";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { Checkbox } from "../../../components/UI/Checkbox";
import { TSettingsDtoRequest } from "../../../api/entities/admin/admin.types";
import { Button } from "../../../components/UI/Button/Button";

const months = [
  { name: "Январь", number: 1 },
  { name: "Февраль", number: 2 },
  { name: "Март", number: 3 },
  { name: "Апрель", number: 4 },
  { name: "Май", number: 5 },
  { name: "Июнь", number: 6 },
  { name: "Июль", number: 7 },
  { name: "Август", number: 8 },
  { name: "Сентябрь", number: 9 },
  { name: "Октябрь", number: 10 },
  { name: "Ноябрь", number: 11 },
  { name: "Декабрь", number: 12 },
];

export function AdminSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => adminApiService.getSettings(),
  });

  const currentMonth = months.find(
    (month) => month.number === data?.data.month
  );

  const [selectedMonth, setSelectedMonth] = useState(currentMonth || null);
  const [showAllDays, setShowAllDays] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (params: TSettingsDtoRequest) =>
      adminApiService.putSettings({ params }),
  });

  useEffect(() => {
    if (currentMonth) {
      setSelectedMonth(currentMonth);
    }
  }, [data, currentMonth]);

  const handleMonthChange = (e: DropdownChangeEvent) => {
    const newMonth = months.find((month) => month.number === e.value);
    setSelectedMonth(newMonth || null);
  };

  const saveSetting = () => {
    mutate({ month: selectedMonth?.number, showAllDays: showAllDays });
  };

  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Настройки</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className={styles.subtitle}>Месяц отображаемых дней</p>
          <div>
            <Dropdown
              value={selectedMonth?.number}
              onChange={(e) => handleMonthChange(e)}
              options={months}
              optionValue="number"
              optionLabel="name"
              placeholder="Выберите Месяц"
              className={styles.select}
            />
          </div>
          <p className={styles.subtitle}>Показать все дни?</p>
          <Checkbox active={data?.data.showAllDays} onChange={setShowAllDays} />
          <Button
            loading={isPending ? "true" : undefined}
            style={{ maxWidth: "fit-content" }}
            variant="blue"
            onClick={saveSetting}
          >
            Сохранить
          </Button>
        </>
      )}
    </div>
  );
}
