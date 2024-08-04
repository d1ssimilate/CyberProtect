import { createContext, useEffect, useMemo, useState, ReactNode } from "react";
import { AuthContextType, User } from "./AuthProvider.types";
import { useCookie } from "../../hooks/useCookie";
import {
  isTokenExpired,
  handleTokenCheck,
  handleTokenRefresh,
} from "../../utils/auth";
import { adminApiService } from "../../api/entities/admin/admin.api";

export const AuthContext = createContext<AuthContextType>({
  user: { isAuth: false },
  admin: { isAuth: false },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getCookie, setCookie, clearCookies } = useMemo(() => useCookie(), []);
  const [user, setUser] = useState<User>({
    isAuth: !!getCookie("l"),
  });
  const [admin, setAdmin] = useState<User>({
    isAuth: !!getCookie("a"),
  });

  const userRefreshToken = getCookie("userRefreshToken");
  const userExp = getCookie("userExp");

  const adminRefreshToken = getCookie("a-refreshToken");
  const adminExp = getCookie("a-exp");

  useEffect(() => {
    const initAuth = async () => {
      if (getCookie("a")) {
        if (isTokenExpired(adminExp)) {
          await handleTokenRefresh({
            refreshToken: adminRefreshToken,
            setAuthState: setAdmin,
            expKey: "a-exp",
            tokenKey: "a",
          });
        } else {
          await handleTokenCheck({
            checkTokenFn: adminApiService.adminCheckToken,
            setAuthState: setAdmin,
            expKey: "a-exp",
            tokenKey: "a",
          });
        }
      }
    };

    initAuth();
  }, [
    userExp,
    userRefreshToken,
    adminExp,
    adminRefreshToken,
    setCookie,
    clearCookies,
  ]);

  return (
    <AuthContext.Provider value={{ user, admin }}>
      {children}
    </AuthContext.Provider>
  );
};
