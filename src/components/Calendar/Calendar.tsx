import { useRef } from "react";
import { Recommendation } from "../Recommendation/Recommendation";
import styles from "./Calendar.module.scss";
import { CalendarSnowFlakes } from "./CalendarSnowFlakes";
import { positions } from "./Positions";

const numbers = new Array<number>(31).fill(0);

export function Calendar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={containerRef} className={styles.calendar}>
      <CalendarSnowFlakes container={containerRef} />
      <h2 className={styles.title}>
        Адвент-календарь
        <br />
        2024
      </h2>
      <img src="/road.svg" />
      {numbers.map((_, idx) => {
        const position = positions[idx];
        return (
          <Recommendation key={idx} position={position} number={idx + 1} />
        );
      })}
    </div>
  );
}
