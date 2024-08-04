import axios from "axios";
import { useCookie } from "../../../hooks/useCookie";
import { api } from "../../instance";
import {
  TAdminAuthDtoRequest,
  TAdminAuthRequestData,
  TAdminRequestData,
} from "./admin.types";

const { setCookie, clearCookies } = useCookie();
type RefreshToken = { token: string | undefined };
class AdminApi {
  async postAdminAuth({
    config,
    params,
  }: AxiosRequestConfig<TAdminAuthDtoRequest>) {
    const formData = new FormData();
    formData.append("email", params.login);
    formData.append("password", params.password);
    const response = await api.post<TAdminAuthRequestData>(
      "/users/login",
      formData,
      config
    );

    if (response.data.accessToken) {
      setCookie("a", response.data.accessToken);
      setCookie("a-exp", response.data.exp.toString());
      setCookie("a-refreshToken", response.data.refreshToken);
    }
    return response;
  }
  async adminCheckToken() {
    return api.get<TAdminRequestData>("/users/check");
  }
  async adminRefreshToken(token: string | undefined) {
    const response = await axios.patch<TAdminAuthRequestData>(
      "http://172.23.116.163:9000/api/users/refresh",
      null,
      { headers: { RefreshToken: token } }
    );
    console.log(response.data);

    return response;
  }
  async logOut() {
    clearCookies("a");
    clearCookies("a-exp");
    clearCookies("a-refreshToken");
    window.location.replace("/");
  }
}

export const adminApiService = new AdminApi();
