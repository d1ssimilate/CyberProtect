import { useCookie } from "../../../hooks/useCookie";
import { api } from "../../instance";
import { TUserAuthPasswordDataRequest } from "../user/user.types";
import { TAdminAuthDtoRequest } from "./admin.types";

const { setCookie, clearCookies } = useCookie();
class AdminApi {
  async postAdminAuth({
    config,
    params,
  }: AxiosRequestConfig<TAdminAuthDtoRequest>) {
    const formData = new FormData();
    formData.append("email", params.login);
    formData.append("password", params.password);
    const response = await api.post<TUserAuthPasswordDataRequest>(
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

  async logOut() {
    clearCookies("a");
    clearCookies("a-exp");
    clearCookies("a-refreshToken");
    window.location.replace("/");
  }
}

export const adminApiService = new AdminApi();
