import { api } from "../../instance";
import {
  TRecommendationEditDtoRequest,
  TRecommendationRequestData,
} from "./recommendation.types";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

class RecommendationApi {
  async getRecommendations() {
    return api.get<TRecommendationRequestData[]>("/days", {
      params: { timeZone },
    });
  }
  async getRecommendationsAdmin() {
    return api.get<TRecommendationRequestData[]>("/days/admin");
  }

  async putRecommendationRequest({
    config,
    params,
  }: AxiosRequestConfig<TRecommendationEditDtoRequest>) {
    const formData = new FormData();
    formData.append("title", params.title);
    formData.append("description", params.description);
    if (params.attachments)
      for (const attachment of params.attachments) {
        formData.append("attachments", attachment);
      }
    const response = await api.put(`/days/${params.id}`, formData, config);
    return response;
  }
}

export const recommendationApiService = new RecommendationApi();
