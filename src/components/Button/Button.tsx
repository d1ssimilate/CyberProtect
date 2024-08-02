import { ComponentProps } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ComponentProps<"button"> {
  variant: "red" | "blue";
  loading?: boolean | string;
}
export function Button(props: ButtonProps) {
  return (
    <button {...props} className={`${styles.button} ${styles[props.variant]}`}>
      {props.children}
    </button>
  );
}
