import { ComponentProps } from "react";
import styles from "./Loader.module.scss";

export const Loader = (props: ComponentProps<"span">) => {
  return (
    <div className={styles.loader}>
      <span className={styles.item} {...props}></span>
    </div>
  );
};
