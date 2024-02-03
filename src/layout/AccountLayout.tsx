// react
import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
// components
import FooterLineBg from "@/components/FooterLineBg";
// utils
import useRWD from "@/utils/useRWD";
import useContextUserData from "@/utils/useContextUserData";

export default function Account() {
  // 取得共用資料
  const userContextValue = useContextUserData();
  const { user, token, updateUserDataFn } = userContextValue!;

  const device = useRWD();
  const navigate = useNavigate();

  // 如果登出就導回首頁
  useEffect(() => {
    if (token === undefined) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [token, navigate]);

  // 切割使用者名字
  const [userSpiltName, setUserSpiltName] = useState("");
  useEffect(() => {
    if (user?.name) {
      const spiltName = user?.name.split(" ");
      setUserSpiltName(spiltName[0]);
    }
  }, [user?.name]);

  return (
    <div className="w-full">
      <div
        className={`w-full h-52 lg:h-[392px] bg-center bg-cover ${
          device === "PC"
            ? " bg-[url('/img/pc/hero.jpg')]"
            : " bg-[url('/img/mobile/hero.jpg')]"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto h-full px-5 py-10 lg:px-20 lg:py-20 lg:flex lg:gap-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-10">
            <img
              src={
                device === "PC"
                  ? "img/pc/avatar/asset2.png"
                  : "img/mobile/avatar/asset2.png"
              }
              alt=""
              className=""
            />
            <h1 className="text-white text-h3 lg:text-h1 font-bold tracking-wider">
              Hello, {userSpiltName}
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-3 py-10 lg:px-20 lg:py-20">
        <ul className="flex pb-10 lg:pb-20">
          <li className="p-4 px-6 lg:p-6">
            <NavLink
              to="/userData"
              className="text-white text-sm lg:text-base hover:text-primary-100 transition duration-300 relative py-3 account-link"
            >
              個人資料
            </NavLink>
          </li>
          <li className="p-4 px-6 lg:p-6">
            <NavLink
              to="/orderData"
              className="text-white text-sm lg:text-base hover:text-primary-100 transition duration-300 relative py-3 account-link"
            >
              我的訂單
            </NavLink>
          </li>
        </ul>
        <div className=" flex flex-col lg:flex-row gap-6 lg:gap-10">
          <Outlet context={{ user, updateUserDataFn }} />
        </div>
      </div>
      <FooterLineBg />
    </div>
  );
}
