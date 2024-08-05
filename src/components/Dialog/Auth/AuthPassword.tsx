import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import styles from "./Auth.module.scss";
import { useAuthPassword } from "./hooks/useAuthPassword";

export function AuthPasswordDialog() {
  const { register, onSubmit, errors, handleSubmit, isPending } =
    useAuthPassword();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        error={errors.code?.message}
        {...register("code", {
          required: "Обязательное поле",
        })}
        placeholder="Пароль"
        label="Пароль"
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
