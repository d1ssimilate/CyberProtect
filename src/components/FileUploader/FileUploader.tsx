import { Image } from "primereact/image";
import { CrossIcon } from "../UI/Icons/CrossIcon";
import styles from "./FileUploader.module.scss";
import { useState, useEffect, ChangeEvent } from "react";
import { url } from "../../api/instance";
import { TRecommendationAttachment } from "../../api/entities/recommendation/recommendation.types";

interface FileUploadProps {
  files: (File | TRecommendationAttachment)[];
  setFiles: (files: (File | TRecommendationAttachment)[]) => void;
}

export const FileUploader = (props: FileUploadProps) => {
  const [localFiles, setLocalFiles] = useState(props.files ?? []);

  useEffect(() => {
    setLocalFiles(props.files ?? []);
  }, [props.files]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setLocalFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        props.setFiles(updatedFiles);
        return updatedFiles;
      });
    }
  };

  const handleRemoveFile = (fileToRemove: File | TRecommendationAttachment) => {
    setLocalFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
      props.setFiles(updatedFiles);
      return updatedFiles;
    });
  };

  const renderFilePreview = (file: any) => {
    const isFile = file instanceof File;
    const fileUrl = isFile ? URL.createObjectURL(file) : `${url}${file.url}`;

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
  };
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input type="file" multiple onChange={handleFileChange} />
        Добавить файлы
      </div>
      <div className={styles.files}>
        {localFiles.map((file, index) => (
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
