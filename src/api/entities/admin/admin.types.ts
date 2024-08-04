export type TAdminAuthDtoRequest = {
  login: string;
  password: string;
};
export type TAdminAuthRequestData = {
  accessToken: string;
  exp: number;
  refreshToken: string;
};
export type TAdminRequestData = {
  id: number;
  email: string;
  refreshToken: string;
  role: string;
};
