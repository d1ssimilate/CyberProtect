import { Image } from "primereact/image";
import { CrossIcon } from "../UI/Icons/CrossIcon";
import styles from "./FileUploader.module.scss";
import { ChangeEvent } from "react";
import { url } from "../../api/instance";
import { TRecommendationAttachment } from "../../api/entities/recommendation/recommendation.types";

interface FileUploadProps {
  files: (File | any)[];
  multiple?: boolean;
  setFiles: (files: (File | any)[]) => void;
}

export const FileUploader = (props: FileUploadProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (props.multiple) {
        const updatedFiles = [...props.files, ...newFiles];
        props.setFiles(updatedFiles);
      } else {
        const updatedFiles = newFiles;
        props.setFiles(updatedFiles);
      }
    }
  };

  const handleRemoveFile = (fileToRemove: File | TRecommendationAttachment) => {
    const updatedFiles = props.files.filter((file) => file !== fileToRemove);
    props.setFiles(updatedFiles);
  };

  const renderFilePreview = (file: any) => {
    const isFile = file instanceof File;
    const fileUrl = isFile
      ? URL.createObjectURL(file)
      : file.url
        ? `${url}${file.url}`
        : `${url}${file}`;
    if (file.type) {
      if (file.type.includes("image")) {
        return (
          <Image
            className={styles.img}
            src={fileUrl}
            alt={file.name}
            preview={true}
          />
        );
      } else if (file.type.includes("video")) {
        return <video src={fileUrl} controls />;
      } else {
        return (
          <p style={{ color: "var(--deep-blue)" }}>
            {file.name ? file.name : file.label}
          </p>
        );
      }
    } else {
      return (
        <Image
          className={styles.img}
          src={fileUrl}
          alt={file.name}
          preview={true}
        />
      );
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input
          type="file"
          multiple={props.multiple}
          onChange={handleFileChange}
        />
        Добавить файлы
      </div>
      <div className={styles.files}>
        {props.files.map((file, index) => (
          <div key={index} className={styles.file}>
            <CrossIcon
              onClick={() => handleRemoveFile(file)}
              className={styles.close}
            />
            {renderFilePreview(file)}
          </div>
        ))}
      </div>
    </div>
  );
};
