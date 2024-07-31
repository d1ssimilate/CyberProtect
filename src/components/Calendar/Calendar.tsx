import { useRef } from "react";
import { Recommendation } from "../Recommendation/Recommendation";
import styles from "./Calendar.module.scss";
import { Masonry } from "../Masonry/Masonry";

const numbers = new Array<number>(31).fill(0);

const images = [
  "/christmas-toys/black-ball.svg",
  "/christmas-toys/green-ball.svg",
  "/christmas-toys/red-ball.svg",
  "/christmas-toys/gift.svg",
  "/christmas-toys/snowman.svg",
  "/christmas-toys/snowGlobe.svg",
];

export function Calendar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const recommendationItems = numbers.map((_, idx) => {
    const isOdd = (idx + 1) % 2 !== 0;
    const imageIndex = ((idx - (idx % 2)) / 2) % images.length;
    return (
      <>
        {isOdd && <img className={styles.toy} src={images[imageIndex]} />}
        <Recommendation key={idx} number={idx + 1} />
      </>
    );
  });
  return (
    <div ref={containerRef} className={`container ${styles.calendar}`}>
      <h2 className={styles.title}>
        Адвент-календарь
        <br />
        2024
      </h2>
      <Masonry items={recommendationItems}></Masonry>
    </div>
  );
}
