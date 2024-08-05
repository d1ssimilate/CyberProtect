import { createContext, useEffect, useMemo, useState, ReactNode } from "react";
import { AuthContextType, User } from "./AuthProvider.types";
import { useCookie } from "../../../hooks/useCookie";
import {
  isTokenExpired,
  handleTokenCheck,
  handleTokenRefresh,
} from "../../../utils/auth";
import { userApiService } from "../../../api/entities/user/user.api";

export const AuthContext = createContext<AuthContextType>({
  user: { isAuth: false },
  admin: { isAuth: false },
  setUser: () => {},
});

const checkAndRefreshToken = async (
  tokenKey: string,
  refreshToken: string | undefined,
  expKey: string,
  setAuthState: React.Dispatch<React.SetStateAction<User>>
) => {
  if (isTokenExpired(expKey)) {
    await handleTokenRefresh({
      refreshToken,
      setAuthState,
      expKey,
      tokenKey,
    });
  } else {
    await handleTokenCheck({
      checkTokenFn: userApiService.userCheckToken,
      setAuthState,
      expKey,
      tokenKey,
    });
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getCookie, setCookie, clearCookies } = useMemo(() => useCookie(), []);
  const [user, setUser] = useState<User>({ isAuth: !!getCookie("l") });
  const [admin, setAdmin] = useState<User>({ isAuth: !!getCookie("a") });

  const userRefreshToken = getCookie("l-refreshToken");
  const userExp = getCookie("l-exp");

  const adminRefreshToken = getCookie("a-refreshToken");
  const adminExp = getCookie("a-exp");

  useEffect(() => {
    const initAuth = async () => {
      if (getCookie("a")) {
        await checkAndRefreshToken("a", adminRefreshToken, "a-exp", setAdmin);
      }
      if (getCookie("l")) {
        await checkAndRefreshToken("l", userRefreshToken, "l-exp", setUser);
      }
    };

    initAuth();
  }, [
    getCookie,
    userExp,
    userRefreshToken,
    adminExp,
    adminRefreshToken,
    setCookie,
    clearCookies,
  ]);

  return (
    <AuthContext.Provider value={{ user, admin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
