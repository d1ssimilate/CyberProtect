import { ComponentProps } from "react";
import styles from "./Button.module.scss";
import { Loader } from "../Loader/Loader";

interface ButtonProps extends ComponentProps<"button"> {
  variant: "red" | "blue";
  loading?: boolean | string;
}
export function Button(props: ButtonProps) {
  return (
    <button {...props} className={`${styles.button} ${styles[props.variant]}`}>
      {props.loading ? (
        <Loader style={{ width: "25px", height: "25px" }} />
      ) : (
        props.children
      )}
    </button>
  );
}
