import { Button } from "../Button/Button";
import { LogoIcon } from "../Icons/LogoIcon";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <a
          className={styles.logo}
          href="https://cyberprotect.ru"
          target="_blank"
        >
          <LogoIcon />
        </a>
        <h1 className={styles.title}>Кибербезопасный Новый год</h1>
        <div className={styles.actions}>
          <Button variant="red">Подписаться</Button>
          <Button variant="blue">Войти</Button>
        </div>
      </div>
    </header>
  );
}
