import styles from "./Header.module.scss";
import { Button } from "../UI/Button/Button";
import { User } from "../Providers/AuthProvider/AuthProvider.types";
import { CrossIcon } from "../UI/Icons/CrossIcon";
import { BurgerMenuIcon } from "../UI/Icons/BurgerMenuIcon";
import { userApiService } from "../../api/entities/user/user.api";
import { useContext, useEffect, useState } from "react";
import { DialogContext } from "../Providers/DialogProvier/DialogProvider";
import { Sidebar } from "primereact/sidebar";

export function HeaderMenu(props: User) {
  const [isOpen, setIsOpen] = useState(false);
  const { setDialog, nameModal } = useContext(DialogContext);
  useEffect(() => {
    setIsOpen(false);
  }, [nameModal]);
  const SubscribeOrDelete = () => {
    if (!localStorage.getItem("email")) {
      return (
        <Button
          variant="red"
          onClick={() => setDialog("Subscribe", "Подписаться")}
        >
          Подписаться
        </Button>
      );
    } else {
      return (
        <Button
          variant="red"
          onClick={() =>
            userApiService.userDeleteSubcribe(localStorage.getItem("email")!)
          }
        >
          Отписаться
        </Button>
      );
    }
  };
  return (
    <div className={styles.menu}>
      <div onClick={() => setIsOpen(true)} className={styles.menu__icon}>
        {isOpen ? <CrossIcon /> : <BurgerMenuIcon />}
      </div>
      <Sidebar
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        position="right"
        pt={{ content: { className: styles.menu__content } }}
      >
        {props.isAuth ? (
          <>
            <p className={`${styles.user} ${styles.user__burger}`}>
              {props.email}
            </p>
            <SubscribeOrDelete />
            <Button variant="blue" onClick={() => userApiService.logOut()}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <SubscribeOrDelete />
            <Button
              variant="blue"
              onClick={() => setDialog("AuthEmail", "Авторизация")}
            >
              Войти
            </Button>
          </>
        )}
      </Sidebar>
    </div>
  );
}
