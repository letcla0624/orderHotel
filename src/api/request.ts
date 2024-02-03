import { sweetAlertError } from "@/utils/sweetAlert";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

// 使用請求攔截器來加上 headers Authorization
request.interceptors.request.use((config) => {
  config.headers.Authorization = Cookies.get("orderHotelToken");

  return config;
});

// 使用回應攔截器來刷新 token
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 登入 cookie 過期就跳轉到登入頁
    if (error.response.status === 403) {
      await sweetAlertError(error as AxiosError, "Cookie 已過期");
      // 獲取獲取當前哈希路徑來拼接成新路徑
      const currentHash = window.location.hash.split("/");
      window.location.href = `${currentHash[0]}/login`;
    }

    return Promise.reject(error);
  }
);
