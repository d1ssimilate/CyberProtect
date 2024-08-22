import { useContext, useEffect } from "react";
import { useAuthEmail } from "../../components/Dialog/Auth/hooks/useAuthEmail";
import { Button } from "../../components/UI/Button/Button";
import { Input } from "../../components/UI/Input/Input";
import styles from "./Admin.module.scss";
import { AuthContext } from "../../components/Providers/AuthProvider/AuthProvider";

export const AdminAuth = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user.role) {
      if (user.role === "admin") window.location.replace("/admin/dashboard");
    }
  }, [user]);
  const { register, onSubmit, errors, handleSubmit, isPending, isSuccess } =
    useAuthEmail();
  useEffect(() => {
    if (isSuccess) window.location.replace("/admin/dashboard");
  }, [isSuccess]);

  return (
    <div className={`container ${styles.auth}`}>
      <p className={styles.auth__title}>Вход в панель администратора</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          error={errors.email?.message}
          {...register("email", { required: "Обязательное поле" })}
          placeholder="Почта"
          label="Почта"
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
