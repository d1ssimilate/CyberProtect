import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCookie } from "../hooks/useCookie";
import { useToast } from "../hooks/useToast";
import { TResponseMessage } from "../types/response.types";

export const queryClient = new QueryClient();

const { getCookie } = useCookie();
const url = "http://172.23.116.163:9000/api";

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
    const token = window.location.pathname.startsWith("/admin")
      ? getCookie("a")
      : getCookie("l");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(123);

    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    if (isResponseMessage(response.data))
      useToast(response.data.success, response.data.message);

    return response;
  },
  (error) => {
    const errorMessage = error.response.data as TResponseMessage;
    useToast(errorMessage.success, errorMessage.message);
    return Promise.reject(error);
  }
);

export { api, url };
