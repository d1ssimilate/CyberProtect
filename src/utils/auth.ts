import { AxiosError } from "axios";
import { adminApiService } from "../api/entities/admin/admin.api";
import {
  checkTokenFN,
  refreshTokenFN,
} from "../components/AuthProvider/AuthProvider.types";
import { useCookie } from "../hooks/useCookie";

const { setCookie, clearCookies } = useCookie();

export const getCurrentTime = () => new Date().getTime();

export const isTokenExpired = (exp: string | undefined) => {
  const expirationTime = Number(exp) * 1000;
  return expirationTime < getCurrentTime();
};

export const handleTokenRefresh = async ({
  refreshToken,
  setAuthState,
  expKey,
  tokenKey,
}: refreshTokenFN) => {
  try {
    const response = await adminApiService.adminRefreshToken(refreshToken);

    setCookie(tokenKey, response.data.accessToken, { secure: true });
    setCookie(expKey, response.data.exp.toString());
    setCookie(`${tokenKey}-refreshToken`, response.data.refreshToken, {
      secure: true,
    });
    setAuthState({ isAuth: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        clearCookies(tokenKey);
        clearCookies(expKey);
        clearCookies(`${tokenKey}-refreshToken`);
        if (window.location.pathname === "/admin/dashboard")
          window.location.replace("/");
      }
    }
  }
};

export const handleTokenCheck = async ({
  checkTokenFn,
  setAuthState,
  expKey,
  tokenKey,
}: checkTokenFN) => {
  try {
    const response = await checkTokenFn();
    setAuthState({ ...response.data, isAuth: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        clearCookies(tokenKey);
        clearCookies(expKey);
        clearCookies(`${tokenKey}-refreshToken`);
        if (window.location.pathname === "/admin/dashboard")
          window.location.replace("/");
      }
    }
  }
};
