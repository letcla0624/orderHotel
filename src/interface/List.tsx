import { Icon } from "./Icon";

export interface IconList {
  id: number;
  title?: string;
  description?: string;
  icon: Icon;
  text?: string;
  numText?: string;
}

// 各類 swiper
export interface SwiperList {
  id: number;
  imageBig: string | string[];
  imageSmall: string | string[];
  alt?: string;
  title?: string;
  description?: string;
  price?: number;
  week?: string;
  time?: string;
  icon?: IconList[];
  layout?: string[];
  equipment?: string[];
  supply?: string[];
}

// header 主選單
export interface MenuList {
  id: number;
  link: string;
  menuText: string;
  class?: string;
}

// footer 聯絡資訊
export interface ContactList {
  id: number;
  title: string;
  text: string;
  link: string;
}
