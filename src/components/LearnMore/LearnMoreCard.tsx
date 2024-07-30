import { Image } from "primereact/image";
import styles from "./LearnMore.module.scss";
export function LearnMoreCard({ item }: { item: any }) {
  return (
    <div className={styles.slide}>
      <Image
        className={styles.preview}
        src={item.preview}
        alt="Image"
        preview={true}
      />
      <div className={styles.project}>
        <h3 className={styles.project__name}>{item.title}</h3>
        <p className={styles.project__description}>{item.description}</p>
      </div>
    </div>
  );
}
