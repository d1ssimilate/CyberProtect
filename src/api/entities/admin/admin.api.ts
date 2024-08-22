import { api } from "../../instance";
import { TRecommendationRequestData } from "../recommendation/recommendation.types";
import { TSettingDataRequest, TSettingsDtoRequest } from "./admin.types";

class AdminApi {
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
}

export const adminApiService = new AdminApi();
