import { emailRegExp } from "../../../utils/regExp";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import styles from "./Auth.module.scss";
import { useAuthEmail } from "./hooks/useAuthEmail";

export function AuthEmailDialog() {
  const { register, onSubmit, errors, handleSubmit, isPending } =
    useAuthEmail();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        error={errors.email?.message}
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value: emailRegExp(),
            message: "Некорректная почта",
          },
        })}
        placeholder="Почта"
        label="Почта"
      />
      <Button
        type="submit"
        loading={isPending ? "true" : undefined}
        variant="blue"
      >
        Войти
      </Button>
    </form>
  );
}
