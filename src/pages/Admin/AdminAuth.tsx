import { useContext, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import styles from "./Admin.module.scss";
import { useAdminAuth } from "./hooks/useAdminAuth";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";

export const AdminAuth = () => {
  const { register, onSubmit, errors, handleSubmit, isPending, isSuccess } =
    useAdminAuth();
  useEffect(() => {
    if (isSuccess) {
      console.log(1);
    }
  }, [isSuccess]);
  const { admin } = useContext(AuthContext);
  console.log(admin);

  return (
    <div className={`container ${styles.auth}`}>
      <p className={styles.auth__title}>Вход в панель администратора</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          error={errors.login?.message}
          {...register("login", { required: "Обязательное поле" })}
          placeholder="Логин"
          label="Логин"
        />
        <Input
          error={errors.password?.message}
          {...register("password", { required: "Обязательное поле" })}
          type="password"
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
    </div>
  );
};
