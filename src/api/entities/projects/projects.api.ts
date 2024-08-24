import { api } from "../../instance";
import { TProjectRequestData, TProjectsDtoRequest } from "./projects.types";

class ProjectsApi {
  async getProjects() {
    return api.get<TProjectRequestData[]>("/projects");
  }
  async postProjects({
    config,
    params,
  }: AxiosRequestConfig<TProjectsDtoRequest>) {
    const formData = new FormData();
    formData.append("description", params.description);
    formData.append("title", params.title);
    formData.append("previews", params.preview);
    formData.append("link", params.link);
    const response = api.post(`/projects`, formData, config);
    return response;
  }
  async putProjects({
    config,
    params,
  }: AxiosRequestConfig<TProjectRequestData>) {
    const formData = new FormData();
    formData.append("description", params.description);
    formData.append("title", params.title);
    if (params.preview && params.preview instanceof File)
      formData.append("previews", params.preview);
    formData.append("link", params.link);
    const response = api.put(`/projects/${params.id}`, formData, config);
    return response;
  }
  async deleteProjects(id: number) {
    return api.delete(`/projects/${id}`);
  }
}

export const projectsApiService = new ProjectsApi();
