import { Link } from "@tanstack/react-router";
import { Button } from "../Button/Button";
import { LogoIcon } from "../Icons/LogoIcon";
import styles from "./Header.module.scss";
import { HeaderMenu } from "./HeaderMenu";

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
        <Link to={"/"} className={styles.title}>
          <h1>Кибербезопасный Новый год</h1>
        </Link>

        <div className={styles.actions}>
          <Button variant="red">Подписаться</Button>
          <Button variant="blue">Войти</Button>
        </div>
        <HeaderMenu />
      </div>
    </header>
  );
}
