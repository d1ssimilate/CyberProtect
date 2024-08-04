import styles from "./Loader.module.scss";

export function Loader() {
  return (
    <div className={styles.loader}>
      <span className={styles.item}></span>
    </div>
  );
}
