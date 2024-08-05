import { useCookie } from "../../../hooks/useCookie";
import { api } from "../../instance";
import { TRecommendationRequestData } from "../recommendation/recommendation.types";
import { TUserAuthPasswordDataRequest } from "../user/user.types";
import {
  TAdminAuthDtoRequest,
  TSettingDataRequest,
  TSettingsDtoRequest,
} from "./admin.types";

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
  async getRecommendations() {
    return api.get<TRecommendationRequestData[]>("/days/admin");
  }
  async getSettings() {
    return api.get<TSettingDataRequest>("/settings");
  }
  async putSettings({
    config,
    params,
  }: AxiosRequestConfig<TSettingsDtoRequest>) {
    const formData = new FormData();
    formData.append("month", params.month!.toString());
    formData.append("showAllDays", params.showAllDays.toString());
    const response = await api.put("/settings", formData, config);
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
