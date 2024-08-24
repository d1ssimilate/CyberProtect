import { useCookie } from "../../../hooks/useCookie";
import { api } from "../../instance";
import {
  TRecommendationEditDtoRequest,
  TRecommendationRequestData,
  TRecommendationViewDtoRequest,
} from "./recommendation.types";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

class RecommendationApi {
  async getRecommendations() {
    const { getCookie } = useCookie();

    return api.get<TRecommendationRequestData[]>("/days", {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      params: { timeZone, subscriber: localStorage.getItem("email") },
    });
  }
  // async postRecommendationCreateView(id: number) {
  //   return api.post(`/days/${id}/views`);
  // }
  async postRecommendationCreateView({
    config,
    params,
  }: AxiosRequestConfig<TRecommendationViewDtoRequest>) {
    const formData = new FormData();
    formData.append("email", params.email);
    const response = api.post(`/days/${params.id}/views`, formData, config);
    return response;
  }
  async putRecommendationRequest({
    config,
    params,
  }: AxiosRequestConfig<TRecommendationEditDtoRequest>) {
    const formData = new FormData();
    formData.append("title", params.title);
    formData.append("description", params.description);
    formData.append("isLongRead", String(params.isLongRead));
    if (params.attachments)
      for (const attachment of params.attachments) {
        formData.append("attachments", attachment);
      }
    if (params.attachmentIds)
      for (const attachment of params.attachmentIds) {
        formData.append("attachmentIds", String(attachment.id));
      }
    const response = await api.put(`/days/${params.id}`, formData, config);
    return response;
  }
}

export const recommendationApiService = new RecommendationApi();
