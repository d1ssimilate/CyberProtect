import { BurgerMenuIcon } from "../Icons/BurgerMenuIcon";
import { headerAnimations } from "./Header.animations";
import styles from "./Header.module.scss";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "../Button/Button";

export function HeaderMenu() {
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
              <Button variant="red">Подписаться</Button>
              <Button variant="blue">Войти</Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
