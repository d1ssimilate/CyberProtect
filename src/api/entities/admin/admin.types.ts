export type TAdminAuthDtoRequest = {
  email: string;
  password: string;
};
export type TSettingDataRequest = {
  id: number;
  month: number | undefined;
  showAllDays: boolean;
};
export type TSettingsDtoRequest = Omit<TSettingDataRequest, "id">;
