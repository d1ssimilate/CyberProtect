export type DialogContextType = {
  nameModal: string;
  title: string;
  data: unknown;
  containerClassName: string;
  setDialog: SetDialogFn;
};

export type SetDialogFn = (
  nameModal: string,
  title?: string,
  data?: unknown,
  containerClassName?: string
) => void;
