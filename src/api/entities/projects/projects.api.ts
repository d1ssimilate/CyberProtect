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
}

export const projectsApiService = new ProjectsApi();
