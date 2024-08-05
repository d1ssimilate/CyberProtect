import { createContext, useState, ReactNode, useEffect } from "react";
import { DialogContextType } from "./DialogProvider.types";

export const DialogContext = createContext<DialogContextType>({
  nameModal: "",
  title: "",
  data: null,
  setDialog: () => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [nameModal, setNameModal] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [data, setData] = useState<unknown>(null);

  const resetDialog = () => {
    setNameModal("");
    setTitle("");
    setData(null);
  };

  const setDialog = (
    nameModal: string,
    title: string = "",
    data: unknown = null
  ) => {
    if (nameModal === "close") {
      resetDialog();
    } else {
      setNameModal(nameModal);
      setTitle(title);
      setData(data);
    }
  };

  useEffect(() => {
    window.document.body.style.overflow = nameModal ? "hidden" : "unset";
  }, [nameModal]);

  return (
    <DialogContext.Provider value={{ nameModal, title, data, setDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
