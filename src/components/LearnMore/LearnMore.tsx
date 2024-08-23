import { useQuery } from "@tanstack/react-query";
import styles from "./LearnMore.module.scss";
import { LearnMoreCarousel } from "./LearnMoreCarousel";
import { projectsApiService } from "../../api/entities/projects/projects.api";

export function LearnMore() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsApiService.getProjects(),
  });
  return (
    <div className={styles.container}>
      <div className={`container ${styles.content}`}>
        <h2 className={styles.title}>
          Узнайте больше о цифровой безопасности <br /> вместе с Киберпротектом
        </h2>
        {data && <LearnMoreCarousel data={data.data} />}
      </div>
    </div>
  );
}
