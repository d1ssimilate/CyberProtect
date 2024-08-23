import {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  forwardRef,
  SetStateAction,
  useState,
} from "react";

import styles from "./Input/Input.module.scss";
interface CheckboxProps extends ComponentProps<"input"> {
  active?: boolean;
  error?: string;
  showIsConfirm: boolean,
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    return (
      <div className={styles.wrap}>
        <div className={styles.row}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={props.active}
            ref={ref}
            {...props}
          />
          {props.showIsConfirm ? (
            <p className={styles.checkbox__text}>
              Согласен(на) на обработку персональных данных
            </p>
          ) : (
            ""
          )}
        </div>
        <span className={styles.error}>{props.error && props.error}</span>
      </div>
    );
  }
);
