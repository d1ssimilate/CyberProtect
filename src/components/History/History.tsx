import { SnowflakeIcon } from "../Icons/SnowflakeIcon";
import { historyAnimations } from "./History.animations";
import styles from "./History.module.scss";
import { motion } from "framer-motion";

export function History() {
  return (
    <div className={styles.history}>
      <div className="container">
        <motion.div className={styles.content} {...historyAnimations}>
          <h2 className={styles.title}>История создания</h2>
          <ul className={styles.list}>
            <li className={styles.list__item}>
              <SnowflakeIcon />
              <p>
                Конец года – отличная возможность подвести итоги, сделать выводы
                и перейти на новый уровень.
              </p>
            </li>
            <li className={styles.list__item}>
              <SnowflakeIcon />
              <p>
                Шаг за шагом, выполняя простые советы и рекомендации экспертов
                компании «Киберпротект», вы сможете обезопасить себя и своих
                близких в цифровой среде.
              </p>
            </li>
            <li className={styles.list__item}>
              <SnowflakeIcon />
              <p>
                Упоминание, что проект создан в рамках хакатона «ИТ-вызов»
                силами команды “Перфоратор” и ее участников ...
              </p>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
