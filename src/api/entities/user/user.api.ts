import axios from "axios";
import { api } from "../../instance";
import {
  TUserAuthEmailDtoRequest,
  TUserAuthPasswordDataRequest,
  TUserAuthPasswordDtoRequest,
  TUserRequestData,
} from "./user.types";

class UserApi {
  async postAuthEmail({
    config,
    params,
  }: AxiosRequestConfig<TUserAuthEmailDtoRequest>) {
    const formData = new FormData();
    formData.append("email", params.email);
    const response = await api.post("/users/register", formData, config);

    return response;
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
  async userRefreshToken(token: string | undefined) {
    const response = await axios.patch<TUserAuthPasswordDataRequest>(
      "http://172.23.116.163:9000/api/users/refresh",
      null,
      { headers: { RefreshToken: token } }
    );

    return response;
  }
}

export const userApiService = new UserApi();
