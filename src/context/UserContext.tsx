// 這檔案使用在 layout/CommonLayout.tsx 上
// 需要額外再寫 utils/useContextUserData.tsx 並在要使用共用資料的檔案引入

// react
import { createContext, useState, useEffect } from "react";
// interface
import { UserContextValue, UserRegister } from "@/interface/form";
// sweetAlert
import { sweetAlert, confirmAlert } from "@/utils/sweetAlert";
// api data
import Cookies from "js-cookie";
import { getUser } from "@/api/users";
import { RoomsList } from "@/interface/admin";

// 創建共用區塊
export const UserContext = createContext<UserContextValue | null>(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState({} as UserContextValue["user"]);
  const [token, setToken] = useState<string | undefined>(undefined);

  // 預定房型 (這邊空物件設定要注意)
  const [room, setRoom] = useState<RoomsList>({} as RoomsList);

  // 取得預訂日期
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    const localStartDate = localStorage.getItem("startDate");
    const localEndDate = localStorage.getItem("endDate");

    // 如果 localStartDate 或 localEndDate 為 null，則設定預設值
    if (localStartDate && localEndDate) {
      setStartDate(new Date(localStartDate));
      setEndDate(new Date(localEndDate));
    } else {
      setStartDate(new Date());
      const initialEndDate = new Date();
      initialEndDate.setDate(initialEndDate.getDate() + 1);
      setEndDate(initialEndDate);
    }
  }, []);

  // 判斷有無 token，沒有 token 則為未登入狀態
  useEffect(() => {
    (async () => {
      try {
        if (token !== undefined) {
          // 取得用戶資料
          const { data } = await getUser();
          setUser(data.result);
        } else {
          setUser({} as UserContextValue["user"]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [token]);

  // 登入後設定 token
  const resetCookie = Cookies.get("orderHotelToken");
  if (token !== resetCookie) {
    setToken(resetCookie);
  }

  // 登出刪除 token
  const handleLogout = async () => {
    const result = await confirmAlert("warning", "確定要登出嗎？");

    if (result.isConfirmed) {
      sweetAlert("success", "登出成功");
      Cookies.remove("orderHotelToken");
      setToken(undefined);
    }
  };

  //  子層資料更新
  const updateUserDataFn = (newUserData: UserRegister) => {
    setUser(newUserData);
  };

  // 共用區塊要傳入的共用參數
  const userContextValue: UserContextValue = {
    user,
    token,
    handleLogout,
    updateUserDataFn,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    room,
    setRoom,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
