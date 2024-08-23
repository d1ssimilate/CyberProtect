export type TProjectRequestData = {
  description: string;
  id: number;
  preview: File;
  title: string;
  link: string;
};
export type TProjectsDtoRequest = Omit<TProjectRequestData, "id">;
