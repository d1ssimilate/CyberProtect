import { useContext, useEffect, useState } from "react";
import {
  IProjectsAddForm,
  useProjectEdit,
} from "../../../pages/Admin/hooks/useProjectEdit";
import { DialogContext } from "../../Providers/DialogProvier/DialogProvider";
import { TProjectRequestData } from "../../../api/entities/projects/projects.types";
import { Textarea } from "../../UI/Textarea/Textarea";
import { Input } from "../../UI/Input/Input";
import { FileUploader } from "../../FileUploader/FileUploader";
import { Button } from "../../UI/Button/Button";
import { linkRegExp } from "../../../utils/regExp";
import { queryClient } from "../../../api/instance";

export const ProjectEdit = () => {
  const { data, setDialog } = useContext(DialogContext);
  const dialogData = data as TProjectRequestData;
  const [files, setFiles] = useState<File | any>([dialogData.preview]);

  const { errors, handleSubmit, isPending, isSuccess, mutate, register } =
    useProjectEdit({
      description: String(dialogData.description),
      link: String(dialogData.link),
      title: String(dialogData.title),
    });

  useEffect(() => {
    if (isSuccess) {
      queryClient.refetchQueries({ queryKey: ["projects"] });
      setDialog("close");
    }
  }, [isSuccess]);

  const onSubmit = (data: IProjectsAddForm) => {
    mutate({
      description: data.description,
      id: dialogData.id,
      link: data.link,
      title: data.title,
      preview: files[0] as File,
    });
  };
  return (
    <div style={{ maxWidth: "650px" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <Input
          error={errors.title?.message}
          {...register("title", {
            required: "Обязательное поле",
            validate: (value) => {
              return value.length >= 5 || "Должно содержать от 5 символов";
            },
          })}
          placeholder="Заголовок"
          label="Заголовок"
        />
        <Textarea
          error={errors.description?.message}
          {...register("description", {
            required: "Обязательное поле",
            validate: (value) => {
              return value.length >= 5 || "Должно содержать от 5 символов";
            },
          })}
          placeholder="Описание"
          label="Описание"
        />
        <Input
          error={errors.link?.message}
          {...register("link", {
            required: "Обязательное поле",
            pattern: {
              value: linkRegExp(),
              message: "Некорректная ссылка",
            },
          })}
          placeholder="Ссылка"
          label="Ссылка"
        />
        <FileUploader
          files={files}
          setFiles={(newFiles: File[]) => setFiles(newFiles)}
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
};
