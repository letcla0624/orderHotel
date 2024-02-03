import { request } from "@/api/request";
import { NewsAndFoodsList, OrdersList, RoomsList } from "@/interface/admin";

// 新增最新消息
export const createNews = (data: NewsAndFoodsList) => {
  return request({
    method: "POST",
    url: "/api/v1/admin/news/",
    data,
  });
};

// 取得最新消息
export const readAllNews = () => {
  return request({
    method: "GET",
    url: "/api/v1/admin/news/",
  });
};

// 更新最新消息
export const updateNews = (id: string, data: NewsAndFoodsList) => {
  return request({
    method: "PUT",
    url: `/api/v1/admin/news/${id}`,
    data,
  });
};

// 更新最新消息
export const deleteNews = (id: string) => {
  return request({
    method: "DELETE",
    url: `/api/v1/admin/news/${id}`,
    data: id,
  });
};

// 新增美味佳餚
export const createFood = (data: NewsAndFoodsList) => {
  return request({
    method: "POST",
    url: "/api/v1/admin/culinary/",
    data,
  });
};

// 取得美味佳餚
export const readAllFoods = () => {
  return request({
    method: "GET",
    url: "/api/v1/admin/culinary/",
  });
};

// 更新美味佳餚
export const updateFood = (id: string, data: NewsAndFoodsList) => {
  return request({
    method: "PUT",
    url: `/api/v1/admin/culinary/${id}`,
    data,
  });
};

// 刪除美味佳餚
export const deleteFood = (id: string) => {
  return request({
    method: "DELETE",
    url: `/api/v1/admin/culinary/${id}`,
    data: id,
  });
};

// 新增房型
export const createRoom = (data: RoomsList) => {
  return request({
    method: "POST",
    url: "/api/v1/admin/rooms/",
    data,
  });
};

// 取得房型
export const readAllRooms = () => {
  return request({
    method: "GET",
    url: "/api/v1/admin/rooms/",
  });
};

// 更新房型
export const updateRoom = (id: string, data: RoomsList) => {
  return request({
    method: "PUT",
    url: `/api/v1/admin/rooms/${id}`,
    data,
  });
};

// 刪除房型
export const deleteRoom = (id: string) => {
  return request({
    method: "DELETE",
    url: `/api/v1/admin/rooms/${id}`,
    data: id,
  });
};

// 取得訂單
export const readAllOrders = () => {
  return request({
    method: "GET",
    url: "/api/v1/admin/orders/",
  });
};

// 更新訂單
export const updateOrder = (id: string, data: OrdersList) => {
  return request({
    method: "PUT",
    url: `/api/v1/admin/orders/${id}`,
    data,
  });
};

// 取消訂單
export const deleteOrder = (id: string) => {
  return request({
    method: "DELETE",
    url: `/api/v1/admin/orders/${id}`,
    data: id,
  });
};
