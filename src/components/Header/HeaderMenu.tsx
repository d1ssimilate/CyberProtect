import { headerAnimations } from "./Header.animations";
import styles from "./Header.module.scss";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Button } from "../UI/Button/Button";
import { User } from "../Providers/AuthProvider/AuthProvider.types";
import { CrossIcon } from "../UI/Icons/CrossIcon";
import { BurgerMenuIcon } from "../UI/Icons/BurgerMenuIcon";

export function HeaderMenu(props: User) {
  const [isOpen, toggleOpen] = useCycle(false, true);
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
                <p className={`${styles.user} ${styles.user__burger}`}>
                  {props.email}
                </p>
              ) : (
                <>
                  <Button variant="red">Подписаться</Button>
                  <Button variant="blue">Войти</Button>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
