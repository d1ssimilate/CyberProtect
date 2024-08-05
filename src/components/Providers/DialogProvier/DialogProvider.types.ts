export type DialogContextType = {
  nameModal: string;
  title: string;
  data: unknown;
  setDialog: SetDialogFn;
};

export type SetDialogFn = (
  nameModal: string,
  title?: string,
  data?: unknown
) => void;
