import { request } from "@/api/request";
import { newOrderData } from "@/interface/form";

// 取得最新消息
export const getNews = () => {
  return request({
    method: "GET",
    url: "/api/v1/home/news/",
  });
};

// 取得美味佳餚
export const getFoods = () => {
  return request({
    method: "GET",
    url: "/api/v1/home/culinary/",
  });
};

// 取得全部房型
export const getRooms = () => {
  return request({
    method: "GET",
    url: "/api/v1/rooms/",
  });
};

// 取得單一房型
export const getRoomId = (id: string) => {
  return request({
    method: "GET",
    url: `/api/v1/rooms/${id}`,
    data: id,
  });
};

// 新增訂單
export const addOrder = (data: newOrderData) => {
  return request({
    method: "POST",
    url: "/api/v1/orders/",
    data,
  });
};

// 前台取得全部訂單
export const getOrders = () => {
  return request({
    method: "GET",
    url: `/api/v1/orders/`,
  });
};

// 前台取得單一訂單
export const getOrderId = (id: string) => {
  return request({
    method: "GET",
    url: `/api/v1/orders/${id}`,
    data: id,
  });
};

// 前台刪除單一訂單
export const removeOrderId = (id: string) => {
  return request({
    method: "DELETE",
    url: `/api/v1/orders/${id}`,
    data: id,
  });
};
