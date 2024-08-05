export type TUserAuthEmailDtoRequest = {
  email: string;
};
export type TUserAuthPasswordDtoRequest = {
  email: string;
  code: string;
};
export type TUserAuthPasswordDataRequest = {
  accessToken: string;
  exp: number;
  refreshToken: string;
};
export type TUserRequestData = {
  id: number;
  email: string;
  refreshToken: string;
  role: string;
  code: string;
};
