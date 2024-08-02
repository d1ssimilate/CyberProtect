import { api } from "../../instance";
import { TRecommendationDtoRequest } from "./recommendation.types";

class RecommendationApi {
  async postRecommendationRequest({
    config,
    params,
  }: AxiosRequestConfig<TRecommendationDtoRequest>) {
    const formData = new FormData();
    formData.append("title", params.title);
    formData.append("description", params.description);
    if (params.attachments)
      for (const attachment of params.attachments) {
        formData.append("attachments", attachment);
      }
    const response = await api.post("/day/", formData, config);
    return response;
  }
}

export const recommendationApiService = new RecommendationApi();
