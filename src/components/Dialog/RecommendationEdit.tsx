import { useContext, useEffect, useState } from "react";
import styles from "../../pages/Admin/Admin.module.scss";
import {
  IRecommendationEditForm,
  useRecommendationEdit,
} from "../../pages/Admin/hooks/useRecommendationEdit";
import { DialogContext } from "../Providers/DialogProvier/DialogProvider";
import {
  TRecommendationAttachment,
  TRecommendationRequestData,
} from "../../api/entities/recommendation/recommendation.types";
import { Button } from "../UI/Button/Button";
import { queryClient } from "../../api/instance";
import { Textarea } from "../UI/Textarea/Textarea";
import { Checkbox } from "../UI/Checkbox";
import { FileUploader } from "../FileUploader/FileUploader";
export function RecommendationEditDialog() {
  const { data: contextData, setDialog } = useContext(DialogContext);
  const dialogData = contextData as TRecommendationRequestData;
  const { errors, handleSubmit, isPending, isSuccess, mutate, register } =
    useRecommendationEdit({
      description: String(dialogData.description),
      title: String(dialogData.title),
    });

  const [isLongRead, setIsLongRead] = useState(dialogData.isLongRead);
  const [files, setFiles] = useState<(File | TRecommendationAttachment)[]>(
    dialogData.attachments ? dialogData.attachments : ([] as File[])
  );

  const onSubmit = (data: IRecommendationEditForm) => {
    mutate({
      description: data.description,
      title: data.title,
      isLongRead: isLongRead,
      id: dialogData.id,
      attachments: files.filter((item) => item instanceof File),
      attachmentIds: files.filter(
        (item) => !(item instanceof File)
      ) as TRecommendationAttachment[],
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
        <Textarea
          error={errors.title?.message}
          {...register("title", { required: "Обязательное поле" })}
          placeholder="Заголовок"
          label="Заголовок"
        />
        <Textarea
          error={errors.description?.message}
          {...register("description", { required: "Обязательное поле" })}
          placeholder="Описание"
          label="Описание"
        />
        <FileUploader
          files={files}
          setFiles={(newFiles: (File | TRecommendationAttachment)[]) =>
            setFiles(newFiles)
          }
        />
        <p className={styles.longRead}>
          Лонгрид
          <Checkbox active={isLongRead} onChange={setIsLongRead} />
        </p>
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
