// 要和 context/UserContext.tsx 搭配
// 用來取得共用的資料

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function useContextUserData() {
  return useContext(UserContext);
}
