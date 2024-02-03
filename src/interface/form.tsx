import { RoomsList } from "./admin";

// 註冊
export interface UserRegister {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
  phone: string;
  birthday: string;
  detail: string;
  address: Address;
  checkTerms: boolean;
}

// 登入
export interface UserLogin {
  email: string;
  password: string;
  checkRemember?: boolean;
}

// 忘記密碼
export interface UserForgotPwd {
  email: string;
  code: string;
  newPassword: string;
}

// 使用者共用資料
export interface UserContextValue {
  user: UserRegister;
  token: string | undefined;
  handleLogout: () => void;
  updateUserDataFn: (newUserData: UserRegister) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  room: RoomsList;
  setRoom: (room: RoomsList) => void;
}

// 更新使用者資料
export interface UpdateUserData {
  _id: string;
  name: string;
  phone: string;
  birthday: string;
  detail: string;
  address: Address;
  oldPassword: string;
  newPassword: string;
  newPasswordAgain?: string;
}

// 新增訂單
export interface newOrderData {
  detail?: string;
  roomId?: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  userInfo: UserInfo;
  name?: string;
  phone?: string;
  email?: string;
}

// 取得訂單
export interface orderData {
  userInfo: UserInfo;
  _id: string;
  roomId: RoomId;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

interface RoomId {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  facilityInfo: FacilityInfo[];
  amenityInfo: FacilityInfo[];
  createdAt: string;
  updatedAt: string;
}

interface FacilityInfo {
  title: string;
  isProvide: boolean;
}

export interface UserInfo {
  address: Address;
  name: string;
  phone: string;
  email: string;
}

interface Address {
  zipcode: number;
  detail: string;
}
