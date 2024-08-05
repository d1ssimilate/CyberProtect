import { Link } from "@tanstack/react-router";
import { Button } from "../UI/Button/Button";
import styles from "./Header.module.scss";
import { HeaderMenu } from "./HeaderMenu";
import { useContext } from "react";
import { DialogContext } from "../Providers/DialogProvier/DialogProvider";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import { LogoIcon } from "../UI/Icons/LogoIcon";

export function Header() {
  const { setDialog } = useContext(DialogContext);
  const { user } = useContext(AuthContext);
  console.log(user);

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
        {user.isAuth ? (
          <p className={styles.user}>{user.email}</p>
        ) : (
          <div className={styles.actions}>
            <Button variant="red">Подписаться</Button>
            <Button
              onClick={() => setDialog("AuthEmail", "Авторизация")}
              variant="blue"
            >
              Войти
            </Button>
          </div>
        )}

        <HeaderMenu {...user} />
      </div>
    </header>
  );
}
