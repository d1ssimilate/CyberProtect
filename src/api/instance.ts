import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCookie } from "../hooks/useCookie";

export const queryClient = new QueryClient();

const { getCookie } = useCookie();
let token: string | undefined;

if (window.location.pathname.startsWith("/admin")) token = getCookie("a");
else token = getCookie("l");

const headers: Record<string, string> = token
  ? { Authorization: `Bearer ${token}` }
  : {};

export const api = axios.create({
  baseURL: "http://172.23.116.163:9000/api",
  headers,
});
