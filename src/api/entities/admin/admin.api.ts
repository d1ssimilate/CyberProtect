import { api } from "../../instance";
import { TAdminAuthDtoRequest } from "./admin.types";

class AdminApi {
  async postAdminAuth({
    config,
    params,
  }: AxiosRequestConfig<TAdminAuthDtoRequest>) {
    const formData = new FormData();
    formData.append("login", params.login);
    formData.append("password", params.password);
    const response = await api.post("/day/", formData, config);
    return response;
  }
}

export const adminApiService = new AdminApi();
