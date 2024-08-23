import { Button } from "../../UI/Button/Button";
import { Checkbox } from "../../UI/Checkbox";
import { Input } from "../../UI/Input/Input";
import { useSubscribe } from "./hooks/useSubscribe";
import { emailRegExp } from "../../../utils/regExp";
import styles from "./Subscribe.module.scss";

export function Subscribe() {
  const { errors, handleSubmit, isPending, register, onSubmit } =
    useSubscribe();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        error={errors.email?.message}
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value: emailRegExp(),
            message: "Некорректная почта",
          },
        })}
        placeholder="email"
        label="Почта"
      />

      <Input
        error={errors.nickname?.message}
        {...register("nickname", {
          required: "Обязательное поле",
        })}
        placeholder="Логин"
        label="Логин"
      />
      <Input
        error={errors.tgUsername?.message}
        {...register("tgUsername", {
          required: "Обязательное поле",
        })}
        placeholder="Логин в телеграмме"
        label="Логин в телеграмме"
      />
      <div className={styles.row}>

      <Checkbox
      className={styles.checkbox}
        error={errors.isConfirm?.message}
        showIsConfirm={true}
        {...register("isConfirm", {
          required: "Обязательное поле",
        })}
      />
      
      </div>

      <Button
        loading={isPending ? "true" : undefined}
        type="submit"
        variant="blue"
      >
        Подписаться
      </Button>
    </form>
  );
}
