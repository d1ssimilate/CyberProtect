import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.copyright}>
          Все права защищены
          <br />© 2024
        </div>
      </div>
    </footer>
  );
}
