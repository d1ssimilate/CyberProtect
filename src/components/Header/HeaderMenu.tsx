import { headerAnimations } from "./Header.animations";
import styles from "./Header.module.scss";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Button } from "../UI/Button/Button";
import { User } from "../Providers/AuthProvider/AuthProvider.types";
import { CrossIcon } from "../UI/Icons/CrossIcon";
import { BurgerMenuIcon } from "../UI/Icons/BurgerMenuIcon";
import { userApiService } from "../../api/entities/user/user.api";
import { useContext } from "react";
import { DialogContext } from "../Providers/DialogProvier/DialogProvider";

export function HeaderMenu(props: User) {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { setDialog } = useContext(DialogContext);
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
      <div onClick={() => toggleOpen()} className={styles.menu__icon}>
        {isOpen ? <CrossIcon /> : <BurgerMenuIcon />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav className={styles.menu__nav} {...headerAnimations}>
            <div className={styles.menu__content}>
              {props.isAuth ? (
                <>
                  <p className={`${styles.user} ${styles.user__burger}`}>
                    {props.email}
                  </p>
                  <SubscribeOrDelete />
                  <Button
                    variant="blue"
                    onClick={() => userApiService.logOut()}
                  >
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
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
