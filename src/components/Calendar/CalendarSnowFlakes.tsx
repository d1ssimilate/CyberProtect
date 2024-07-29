import { useRef, useEffect, RefObject } from "react";
import styles from "./Calendar.module.scss";

interface Snowflake {
  x: number;
  y: number;
  density: number;
}

export function CalendarSnowFlakes({
  container,
}: {
  container: RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const snowflakes: Snowflake[] = [];

    const createSnowflakes = () => {
      for (let i = 0; i < 100; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          density: Math.random() * 10 + 1,
        });
      }
    };

    const drawSnowflakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "24px Arial";
      ctx.fillStyle = "#d9dfe8";
      snowflakes.forEach((snowflake) => {
        ctx.fillText("❄", snowflake.x, snowflake.y);
      });
      updateSnowflakes();
    };

    const updateSnowflakes = () => {
      snowflakes.forEach((snowflake) => {
        snowflake.y += Math.pow(snowflake.density, 0.3);
        if (snowflake.y > canvas.height) {
          snowflake.y = 0;
          snowflake.x = Math.random() * canvas.width;
        }
      });
    };

    const animateSnowflakes = () => {
      drawSnowflakes();
      requestAnimationFrame(animateSnowflakes);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = container.current?.clientHeight
        ? container.current?.clientHeight
        : window.innerWidth;
    };

    resizeCanvas();
    createSnowflakes();
    animateSnowflakes();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.snowFlakes} />;
}
