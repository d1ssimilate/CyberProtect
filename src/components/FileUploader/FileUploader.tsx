import { useState, useEffect, ChangeEvent, FC } from "react";

// Типы для пропсов
type FileUploadProps = {
  files: File[];
  setFiles: (files: File[]) => void;
};

export const FileUploader: FC<FileUploadProps> = ({ files, setFiles }) => {
  const [localFiles, setLocalFiles] = useState<File[]>(files);

  useEffect(() => {
    // Обновление локального состояния при изменении пропсов
    setLocalFiles(files);
  }, [files]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setLocalFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        // Обновляем файлы в родительском компоненте
        setFiles(updatedFiles);
        return updatedFiles;
      });
    }
  };

  const renderFilePreview = (file: File) => {
    console.log(file);

    const fileUrl = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
      return (
        <img src={fileUrl} alt={file.name} className="w-32 h-32 object-cover" />
      );
    } else if (file.type.startsWith("video/")) {
      return (
        <video src={fileUrl} controls className="w-32 h-32 object-cover" />
      );
    } else {
      return <p>{file.name}</p>;
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <div className="mt-4">
        {localFiles.map((file, index) => (
          <div key={index} className="mb-4">
            {renderFilePreview(file)}
          </div>
        ))}
      </div>
    </div>
  );
};
