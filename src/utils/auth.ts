import { AxiosError } from "axios";
import {
  checkTokenFN,
  refreshTokenFN,
} from "../components/Providers/AuthProvider/AuthProvider.types";
import { userApiService } from "../api/entities/user/user.api";
import { useCookie } from "../hooks/useCookie";

const { setCookie, clearCookies } = useCookie();

export const getCurrentTime = () => new Date().getTime();

export const isTokenExpired = (exp: string | undefined) => {
  const expirationTime = Number(exp) * 1000;

  return expirationTime < getCurrentTime();
};

const handleTokenError = (error: any) => {
  if (error instanceof AxiosError && error.response?.status === 401) {
    clearCookies("accessToken");
    clearCookies("exp");
    clearCookies("refreshToken");
    if (window.location.pathname === "/admin/dashboard") {
      window.location.replace("/");
    }
  }
};

export const handleTokenRefresh = async ({
  refreshToken,
  setAuthState,
  tokenKey,
}: refreshTokenFN) => {
  try {
    const response = await userApiService.userRefreshToken(refreshToken);
    setCookie(tokenKey, response.data.accessToken, { secure: true });
    setCookie("exp", response.data.exp.toString());
    setCookie("refreshToken", response.data.refreshToken, {
      secure: true,
    });
    setAuthState({ isAuth: true });
  } catch (error) {
    handleTokenError(error);
  }
};

export const handleTokenCheck = async ({
  checkTokenFn,
  setAuthState,
}: checkTokenFN) => {
  try {
    const response = await checkTokenFn();
    setAuthState({ ...response.data, isAuth: true });
  } catch (error) {
    handleTokenError(error);
  }
};
