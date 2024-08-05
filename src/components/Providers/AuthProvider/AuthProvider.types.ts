import { Dispatch, SetStateAction } from "react";

export type User = {
  code?: string;
  email?: string;
  refreshToken?: string;
  isAuth: boolean;
  role?: string;
};
export type AuthContextType = {
  user: User;
  admin: User;
  setUser: Dispatch<SetStateAction<User>>;
};
export type refreshTokenFN = {
  refreshToken: string | undefined;
  setAuthState: Dispatch<SetStateAction<User>>;
  expKey: string;
  tokenKey: string;
};
export type checkTokenFN = {
  checkTokenFn: any;
  setAuthState: Dispatch<SetStateAction<User>>;
  expKey: string;
  tokenKey: string;
};
