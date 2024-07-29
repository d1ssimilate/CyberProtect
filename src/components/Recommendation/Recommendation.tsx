import { useState } from "react";
import styles from "./Recommendation.module.scss";
import { Modal } from "../Modal/Modal";

interface RecommendationProps {
  number: number;
  position: {
    top: number;
    left: number;
  };
}

export function Recommendation(props: RecommendationProps) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        style={{
          top: `${props.position.top}%`,
          left: `${props.position.left}%`,
        }}
        className={`${styles.recommendation} ${
          currentMonth === 11 && currentDay >= props.number
            ? styles.recommendation__active
            : ""
        }`}
      >
        {props.number}
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
