import styles from "./AdminLayout.module.scss";
import { LogoIcon } from "../../Icons/LogoIcon";
import { PropsWithChildren } from "react";
import { useNavigate } from "@tanstack/react-router";

interface LayoutProps extends PropsWithChildren {
  path: string;
  useSearch: any;
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
            onClick={() => navigate({ search: { tab: "qwe" } })}
          >
            Рекомендации
          </li>
          <li className={styles.link}>Проекты</li>
          <li className={styles.link}>Настройки</li>
        </ul>
      </aside>
      <div className={styles.content}>
        <header>qwe</header>
        {props.children}
      </div>
    </div>
  );
};
