// import { Dispatch, SetStateAction } from "react";

export type User = {
  login?: string;
  email?: string;
  refreshToken?: string;
  isAuth: boolean;
  role?: string;
};
export type AuthContextType = {
  user: User;
  admin: User;
  //   setUser: React.Dispatch<React.SetStateAction<User>>;
  //   setAdmin: React.Dispatch<React.SetStateAction<User>>;
};
