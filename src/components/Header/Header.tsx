import styles from "./Header.module.scss";
import { HeaderMenu } from "./HeaderMenu";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import { LogoIcon } from "../UI/Icons/LogoIcon";

export function Header() {
  const { user } = useContext(AuthContext);
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

        <HeaderMenu {...user} />
      </div>
    </header>
  );
}
