import { useCookie } from "../../../hooks/useCookie";
import { api } from "../../instance";
import {
  TAdminAuthDtoRequest,
  TAdminAuthRequestData,
  TAdminRequestData,
} from "./admin.types";

const { setCookie } = useCookie();

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
    if (response.data.accessToken) setCookie("a", response.data.accessToken);
    return response;
  }
  async adminCheckToken() {
    return api.get<TAdminRequestData>("/users/check");
  }
}

export const adminApiService = new AdminApi();
