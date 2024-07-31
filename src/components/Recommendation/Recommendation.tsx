import { useState } from "react";
import styles from "./Recommendation.module.scss";
import { Modal } from "../Modal/Modal";

interface RecommendationProps {
  number: number;
}
const images = [
  "/christmas-toys/black-ball.svg",
  "/christmas-toys/green-ball.svg",
  "/christmas-toys/red-ball.svg",
  "/christmas-toys/gift.svg",
  "/christmas-toys/snowman.svg",
  "/christmas-toys/snowGlobe.svg",
];

export function Recommendation(props: RecommendationProps) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const [isOpen, setIsOpen] = useState(false);
  const isOdd = props.number % 2 !== 0;
  const imageIndex = props.number % images.length;
  return (
    <>
      <div
        data-preview={images[imageIndex]}
        onClick={() => setIsOpen(true)}
        className={`${styles.recommendation}  ${
          currentMonth === 11 && currentDay >= props.number
            ? styles.recommendation__active
            : ""
        } ${isOdd ? styles.recommendation__odd : ""}`}
      >
        <img className={styles.background} src={images[imageIndex]} />
        <span>{props.number}</span>
      </div>
      <Modal
        number={props.number}
        title="Что может угрожать вашим данным и какие методы используют злоумышленники?"
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        qwe
      </Modal>
    </>
  );
}
