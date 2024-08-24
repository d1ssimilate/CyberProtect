import { useQuery } from "@tanstack/react-query";
import styles from "./AdminProjects.module.scss";
import { projectsApiService } from "../../../api/entities/projects/projects.api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TProjectRequestData } from "../../../api/entities/projects/projects.types";
import { queryClient, url } from "../../../api/instance";
import { Image } from "primereact/image";
import { IProjectsAddForm, useProjectsAdd } from "../hooks/useProjects";
import { Button } from "../../../components/UI/Button/Button";
import { Textarea } from "../../../components/UI/Textarea/Textarea";
import { Input } from "../../../components/UI/Input/Input";
import { linkRegExp } from "../../../utils/regExp";
import { FileUploader } from "../../../components/FileUploader/FileUploader";
import { useContext, useEffect, useState } from "react";
import { DialogContext } from "../../../components/Providers/DialogProvier/DialogProvider";

export const AdminProjects = () => {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsApiService.getProjects(),
  });
  const { setDialog } = useContext(DialogContext);
  const {
    errors,
    handleSubmit,
    isPending,
    mutate,
    register,
    isSuccess,
    reset,
  } = useProjectsAdd();
  const [files, setFiles] = useState<File[] | []>([]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setFiles([]);
      queryClient.refetchQueries({ queryKey: ["projects"] });
    }
  }, [isSuccess]);

  const imageBodyTemplate = (product: TProjectRequestData) => {
    return (
      <Image
        preview={true}
        className={styles.preview}
        src={`${url}${product.preview}`}
        alt={product.title}
      />
    );
  };
  const actionBodyTemplate = (product: TProjectRequestData) => {
    return (
      <div className={styles.actions}>
        <Button
          onClick={() =>
            setDialog("ProjectEdit", "Редактирование проекта", product)
          }
          variant="blue"
        >
          <i className="pi pi-pencil"></i>
        </Button>
        <Button
          onClick={() =>
            setDialog(
              "ProjectDelete",
              `Удалить проект ${product.title}?`,
              product
            )
          }
          variant="red"
        >
          <i className="pi pi-trash"></i>
        </Button>
      </div>
    );
  };
  const onSubmit = (data: IProjectsAddForm) => {
    mutate({
      description: data.description,
      title: data.title,
      link: data.link,
      preview: files[0],
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          Добавить
        </Button>
      </form>
      {data && (
        <DataTable
          value={data.data}
          selectionMode="single"
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="id" header="ID"></Column>
          <Column field="title" header="Заголовок"></Column>
          <Column field="description" header="Описание"></Column>
          <Column
            field="preview"
            header="Обложка"
            body={imageBodyTemplate}
          ></Column>
          <Column field="link" header="Ссылка"></Column>
          <Column header="Действие" body={actionBodyTemplate}></Column>
        </DataTable>
      )}
    </div>
  );
};
