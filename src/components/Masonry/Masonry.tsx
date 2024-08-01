import { useEffect, useMemo, useState } from "react";
import styles from "./Masonry.module.scss";

interface Column {
  items: any[];
}

export function Masonry({ items }: { items: any[] }) {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnCount = useMemo(() => {
    if (screenWidth >= 991) return 5;
    if (screenWidth >= 360) return 3;
    return 1;
  }, [screenWidth]);

  const columns: Column[] = useMemo(() => {
    const numColumns = columnCount;
    const columnsArray: Column[] = Array.from({ length: numColumns }, () => ({
      items: [],
    }));

    items.forEach((item, index) => {
      const columnIndex = index % numColumns;
      columnsArray[columnIndex].items.push(item);
    });

    return columnsArray;
  }, [columnCount, items]);

  return (
    <div className={styles.grid}>
      {columns.map((column, idx) => (
        <div className={styles.column} key={idx}>
          {column.items.map((item, idx) => (
            <div className={styles.item} key={idx}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
