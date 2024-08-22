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
  const [user, setUser] = useState<User>({
    isAuth: !!getCookie("accessToken"),
  });

  const refreshToken = getCookie("refreshToken");
  const exp = getCookie("exp");

  useEffect(() => {
    if (getCookie("accessToken")) {
      const initAuth = async () => {
        await checkAndRefreshToken("accessToken", refreshToken, exp!, setUser);
      };

      initAuth();

      const interval = setInterval(() => {
        checkAndRefreshToken("accessToken", refreshToken, exp!, setUser);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [getCookie, exp, refreshToken, setCookie, clearCookies]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
