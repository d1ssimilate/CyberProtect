import { api } from "../../instance";
import { TClicksRequestData } from "./clicks.types";

class ClicksApi {
  async getClicks() {
    return api.get<TClicksRequestData>("/clicks");
  }
  async postClick() {
    return api.post("/clicks");
  }
}

export const clicksApiService = new ClicksApi();
