import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCookie } from "../hooks/useCookie";

export const queryClient = new QueryClient();

const { getCookie } = useCookie();
const url = "http://172.23.116.163:9000/api";

const api = axios.create({
  baseURL: url,
});

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
    return Promise.reject(error);
  }
);

export { api, url };
