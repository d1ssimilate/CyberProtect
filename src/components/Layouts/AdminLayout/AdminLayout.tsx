import styles from "./AdminLayout.module.scss";
import { PropsWithChildren } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../UI/Button/Button";
import { LogoIcon } from "../../UI/Icons/LogoIcon";
import { userApiService } from "../../../api/entities/user/user.api";
interface LayoutProps extends PropsWithChildren {
  path: string;
}

export const AdminLayout = (props: LayoutProps) => {
  const navigate = useNavigate({ from: props.path });

  return (
    <div className={styles.layout}>
      <aside className={styles.aside}>
        <LogoIcon className={styles.icon} />
        <ul className={styles.links}>
          <li
            className={styles.link}
            onClick={() => navigate({ search: { tab: "recommendations" } })}
          >
            Рекомендации
          </li>
          <li
            className={styles.link}
            onClick={() => navigate({ search: { tab: "projects" } })}
          >
            Проекты
          </li>
          <li
            className={styles.link}
            onClick={() => navigate({ search: { tab: "settings" } })}
          >
            Настройки
          </li>
        </ul>
      </aside>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>ПАНЕЛЬ АДМИНИСТРАТОРА</h1>
          <Button onClick={() => userApiService.logOut()} variant="red">
            Выйти
          </Button>
        </header>
        {props.children}
      </div>
    </div>
  );
};
