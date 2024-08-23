import { useQuery } from "@tanstack/react-query";
import styles from "./Footer.module.scss";
import { clicksApiService } from "../../api/entities/clicks/clicks.api";

export function Footer() {
  const { data } = useQuery({
    queryKey: ["clicks"],
    queryFn: () => clicksApiService.getClicks(),
  });
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.copyright}>
          Все права защищены
          <br />© 2024
        </div>
        <div className={styles.counter}>
          Счетчик:
          <span>{data?.data.count}</span>
        </div>
      </div>
    </footer>
  );
}
