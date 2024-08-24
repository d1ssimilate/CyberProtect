import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCookie } from "../hooks/useCookie";
import { useToast } from "../hooks/useToast";
import { TResponseMessage } from "../types/response.types";

export const queryClient = new QueryClient();

const { getCookie } = useCookie();
const url = "http://172.23.91.178:9000/api";

const api = axios.create({
  baseURL: url,
});

function isResponseMessage(data: any): data is TResponseMessage {
  return (
    data &&
    typeof data.success === "boolean" &&
    typeof data.message === "string"
  );
}

api.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    if (
      isResponseMessage(response.data) &&
      response.data.message !== "Просморт засчитан" &&
      response.data.message !== "Просмотр засчитан"
    )
      useToast(response.data.success, response.data.message);

    return response;
  },
  (error) => {
    const errorMessage = error.response.data as TResponseMessage;
    if (
      error.response.status === 401 &&
      window.location.pathname === "/admin/dashboard"
    )
      window.location.replace("/admin");

    useToast(errorMessage.success, errorMessage.message);
    return Promise.reject(error);
  }
);

export { api, url };
