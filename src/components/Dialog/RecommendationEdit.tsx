import { useContext, useEffect } from "react";
import styles from "../../pages/Admin/Admin.module.scss";
import {
  IRecommendationEditForm,
  useRecommendationEdit,
} from "../../pages/Admin/hooks/useRecommendationEdit";
import { Input } from "../Input/Input";
import { DialogContext } from "../DialogProvier/DialogProvider";
import { TRecommendationRequestData } from "../../api/entities/recommendation/recommendation.types";
import { Button } from "../Button/Button";
import { queryClient } from "../../api/instance";
export function RecommendationEditDialog() {
  const { data: contextData, setDialog } = useContext(DialogContext);
  const dialogData = contextData as TRecommendationRequestData;
  const { errors, handleSubmit, isPending, isSuccess, mutate, register } =
    useRecommendationEdit({
      description: String(dialogData.description),
      title: String(dialogData.title),
    });

  const onSubmit = (data: IRecommendationEditForm) => {
    mutate({
      description: data.description,
      title: data.title,
      id: dialogData.id,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      queryClient.refetchQueries({ queryKey: ["recommendations"] });
      setDialog("close");
    }
  }, [isSuccess]);

  return (
    <div className={styles.edit}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          error={errors.title?.message}
          {...register("title", { required: "Обязательное поле" })}
          placeholder="Заголовок"
          label="Заголовок"
        />
        <Input
          error={errors.description?.message}
          {...register("description", { required: "Обязательное поле" })}
          placeholder="Описание"
          label="Описание"
        />
        <Button
          type="submit"
          loading={isPending ? "true" : undefined}
          variant="blue"
        >
          Сохранить
        </Button>
      </form>
    </div>
  );
}
