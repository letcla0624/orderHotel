// react
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
// 引入共用的資料區塊
import UserProvider from "@/context/UserContext";
// api data
import { getNews, getRooms, getFoods } from "@/api/front";

export default function CommonLayout() {
  // 取得網址路徑
  const { pathname } = useLocation();

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await getNews();
      await getRooms();
      await getFoods();

      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <UserProvider>
            <Header position={"fixed"} />
            {pathname !== "/" && pathname !== "/rooms" ? (
              <div
                className={`w-full h-[calc(100%-72px)] md:h-[calc(100%-96px)] xl:h-[calc(100%-120px)] min-h-screen pt-[72px] md:pt-[96px] xl:pt-[120px] flex justify-center ${
                  (pathname === "/login" || pathname === "/register") &&
                  "items-center"
                } `}
              >
                <Outlet />
              </div>
            ) : (
              <Outlet />
            )}
            {pathname === "/login" || pathname === "/register" ? (
              <></>
            ) : (
              <Footer />
            )}
          </UserProvider>
        </>
      )}
    </>
  );
}
