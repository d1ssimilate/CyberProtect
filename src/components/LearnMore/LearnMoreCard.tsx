import { Image } from "primereact/image";
import styles from "./LearnMore.module.scss";
import { Button } from "../UI/Button/Button";
export function LearnMoreCard({ item }: { item: any }) {
  return (
    <div className={styles.card}>
      <Image
        className={styles.card__preview}
        src={item.preview}
        alt="Image"
        preview={true}
      />
      <div className={styles.card__content}>
        <div className={styles.card__text}>
          <h3 className={styles.card__name}>{item.title}</h3>
          <p className={styles.card__description}>{item.description}</p>
        </div>
        <a className={styles.card__link} href={item.link} target="_blank">
          <Button variant="blue">
            Перейти <i className="pi pi-angle-right" />
          </Button>
        </a>
      </div>
    </div>
  );
}
