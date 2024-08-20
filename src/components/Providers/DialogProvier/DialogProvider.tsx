import { createContext, useState, ReactNode, useEffect } from "react";
import { DialogContextType } from "./DialogProvider.types";

export const DialogContext = createContext<DialogContextType>({
  nameModal: "",
  title: "",
  data: null,
  containerClassName: "",
  setDialog: () => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [nameModal, setNameModal] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [containerClassName, setContainerClassName] = useState<string>("");
  const [data, setData] = useState<unknown>(null);

  const resetDialog = () => {
    setNameModal("");
    setTitle("");
  };

  const setDialog = (
    nameModal: string,
    title: string = "",
    data: unknown = null,
    containerClassName: string = ""
  ) => {
    if (nameModal === "close") {
      resetDialog();
    } else {
      setNameModal(nameModal);
      setTitle(title);
      setData(data);
      setContainerClassName(containerClassName);
    }
  };

  useEffect(() => {
    window.document.body.style.overflow = nameModal ? "hidden" : "unset";
  }, [nameModal]);

  return (
    <DialogContext.Provider
      value={{ containerClassName, nameModal, title, data, setDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};
