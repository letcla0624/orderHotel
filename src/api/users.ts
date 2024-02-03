import { request } from "@/api/request";
import {
  UserRegister,
  UserLogin,
  UpdateUserData,
  UserForgotPwd,
} from "@/interface/form";

// 註冊
export const signup = (data: UserRegister) => {
  return request({
    method: "POST",
    url: "/api/v1/user/signup",
    data,
  });
};

// 登入
export const login = (data: UserLogin) => {
  return request({
    method: "POST",
    url: "/api/v1/user/login",
    data,
  });
};

// 驗證
export const checkout = () => {
  return request({
    method: "GET",
    url: "/api/v1/user/check",
  });
};

// 取得用戶資料
export const getUser = () => {
  return request({
    method: "GET",
    url: "/api/v1/user/",
  });
};

// 更新用戶資料
export const updateUser = (data: UpdateUserData) => {
  return request({
    method: "PUT",
    url: "/api/v1/user/",
    data,
  });
};

// 登入
export const forgotPwd = (data: UserForgotPwd) => {
  return request({
    method: "POST",
    url: "/api/v1/user/forgot",
    data,
  });
};

// 驗證是否為註冊信箱
export const verifyEmail = (email: string) => {
  return request({
    method: "POST",
    url: "/api/v1/verify/email",
    data: {
      email,
    },
  });
};

// 產生信箱驗證碼
export const generateEmailCode = (email: string) => {
  return request({
    method: "POST",
    url: "/api/v1/verify/generateEmailCode",
    data: {
      email,
    },
  });
};
