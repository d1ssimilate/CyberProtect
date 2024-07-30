import { Link } from "@tanstack/react-router";
import { Button } from "../../components/Button/Button";
import styles from "./NotFound.module.scss";

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <p className={styles.status}>404</p>
      <span className={styles.text}>страница не найдена</span>
      <Link to={"/"}>
        <Button variant="blue">Вернуться назад</Button>
      </Link>
    </div>
  );
}
