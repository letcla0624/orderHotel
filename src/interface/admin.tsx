// 最新消息
export interface NewsAndFoodsList {
  _id?: string;
  title: string;
  description: string;
  image: string;
  smallImage: string;
  diningTime?: string;
}

export interface Info {
  title: string;
  isProvide: boolean;
}

// 房型
export interface RoomsList {
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  smallImageUrl?: string;
  smallImageUrlList?: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status?: number;
  facilityInfo: Info[];
  amenityInfo: Info[];
  createdAt?: string;
  updatedAt?: string;
}

// 訂單
export interface OrdersList {
  _id: string;
  userInfo: UserInfo;
  roomId: RoomsList;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  detail?: string;
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
