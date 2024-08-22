import axios from "axios";
import { api, url } from "../../instance";
import {
  TUserAuthEmailDtoRequest,
  TUserAuthPasswordDataRequest,
  TUserAuthPasswordDtoRequest,
  TUserRequestData,
} from "./user.types";
import { useCookie } from "../../../hooks/useCookie";

const { clearCookies } = useCookie();
class UserApi {
  async postAuthEmail({
    config,
    params,
  }: AxiosRequestConfig<TUserAuthEmailDtoRequest>) {
    const formData = new FormData();
    formData.append("email", params.email);
    if (params.password) formData.append("password", params.password);
    const response = await api.post("/users/login", formData, config);
    return response.data;
  }
  async patchAuthPassword({
    config,
    params,
  }: AxiosRequestConfig<TUserAuthPasswordDtoRequest>) {
    const formData = new FormData();
    console.log(params);

    formData.append("email", params.email);
    formData.append("code", params.code);
    const response = await api.patch<TUserAuthPasswordDataRequest>(
      "/users/confirm",
      formData,
      config
    );

    return response;
  }
  async userCheckToken() {
    return api.get<TUserRequestData>("/users/check");
  }
  async logOut() {
    clearCookies("accessToken");
    clearCookies("exp");
    clearCookies("refreshToken");
    window.location.replace("/");
  }
  async userRefreshToken(token: string | undefined) {
    const { getCookie } = useCookie();
    const response = await axios.patch<TUserAuthPasswordDataRequest>(
      `${url}/users/refresh`,
      null,
      {
        headers: {
          RefreshToken: token,
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      }
    );

    return response;
  }
}

export const userApiService = new UserApi();
