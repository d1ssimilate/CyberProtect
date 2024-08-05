import { ComponentProps, forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>{props.label}</span>
      <input
        ref={ref}
        placeholder={props.placeholder}
        className={styles.input}
        type={props.type ? props.type : "text"}
        {...props}
      />
      {props.error && <span className={styles.error}>{props.error}</span>}
    </div>
  );
});
