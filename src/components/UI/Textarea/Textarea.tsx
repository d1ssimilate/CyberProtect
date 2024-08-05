import { ComponentProps, forwardRef } from "react";
import styles from "../Input/Input.module.scss";

interface TextareaProps extends ComponentProps<"textarea"> {
  label: string;
  error?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <div className={styles.wrap}>
        <span className={styles.label}>{props.label}</span>
        <textarea
          ref={ref}
          placeholder={props.placeholder}
          className={`${styles.input} ${styles.textarea}`}
        />
        {props.error && <span className={styles.error}>{props.error}</span>}
      </div>
    );
  }
);
