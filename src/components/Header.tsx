// react
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// css
import "@/assets/style/header.scss";
// components
import Logo from "./Logo";
// utils
import useRWD from "@/utils/useRWD";
import useContextUserData from "@/utils/useContextUserData";
// icon
import { MaterialSymbol } from "react-material-symbols";

export default function Header({ position }) {
  // 取得共用資料
  const userContextValue = useContextUserData();
  // 斷言不會為 null 或 undefined
  const { user, token, handleLogout } = userContextValue!;

  // 切割使用者名字
  const [userSpiltName, setUserSpiltName] = useState("");
  useEffect(() => {
    if (user?.name) {
      const spiltName = user?.name.split(" ");
      setUserSpiltName(spiltName[0]);
    }
  }, [user?.name]);

  // 捲動視窗 header 變化
  const device = useRWD();
  const navBar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop > 80 && device !== "mobile") {
        navBar.current?.setAttribute(
          "style",
          "background-color: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); width: 80%; max-width: 1200px; margin: 0 auto; padding: 1.25rem 1.5rem; border-radius: 1rem; margin-top: 1.25rem;"
        );
      } else if (scrollTop > 0 && device === "mobile") {
        navBar.current?.setAttribute("style", "background-color: var(--bg);");
      } else {
        navBar.current?.removeAttribute("style");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [device]);

  // 手機選單打開/關閉
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  // 手機選單打開
  const openMenu = () => {
    menuRef.current?.setAttribute("style", "display:block;");
    // 底層頁面禁止滑動
    document
      .querySelector("body")
      ?.setAttribute("style", "height:100vh; overflow:hidden;");
  };
  // 手機選單關閉
  const closeMenu = () => {
    menuRef.current?.removeAttribute("style");
    document.querySelector("body")?.removeAttribute("style");
  };

  // 切換頁面後手機版 menu 重置
  useEffect(() => {
    menuRef.current?.removeAttribute("style");
    document.querySelector("body")?.removeAttribute("style");
  }, [pathname]);

  return (
    <header>
      <nav className={`${position} w-full top-0 z-50`}>
        <div
          className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-3 lg:px-20 lg:py-6 transition duration-300"
          ref={navBar}
        >
          <Logo />
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden"
            onClick={openMenu}
          >
            <span className="sr-only">Open menu</span>
            <MaterialSymbol
              icon="menu"
              size={32}
              fill={false}
              grade={0}
              color="#fff"
            />
          </button>
          <div
            className="w-full md:w-auto hidden md:block"
            id="navbar-default"
            ref={menuRef}
          >
            <div className="text-white bg-black-bg md:bg-transparent h-screen md:h-auto w-full md:w-auto fixed md:relative top-0 left-0 px-3 py-10 md:p-0 flex items-center">
              <button
                type="button"
                className="absolute inline-flex justify-center items-center top-4 right-3 p-2 w-10 h-10 rounded-lg md:hidden"
                onClick={closeMenu}
              >
                <span className="sr-only">Close menu</span>
                <MaterialSymbol
                  icon="close"
                  size={32}
                  fill={false}
                  grade={0}
                  color="#fff"
                />
              </button>
              {/* 註冊和登入頁平板以上選單會隱藏 */}
              {((pathname !== "/login" && pathname !== "/register") ||
                device === "mobile") && (
                <ul className="flex flex-col py-4 md:py-0 gap-10 md:gap-2 lg:gap-5 text-center md:flex-row md:items-center lg:space-x-4 w-full">
                  <li>
                    <NavLink
                      to="/rooms"
                      className={`block text-white hover:text-primary-100 p-4 transition duration-300`}
                    >
                      客房旅宿
                    </NavLink>
                  </li>
                  <li className="dropdown cursor-pointer md:max-w-[120px] lg:max-w-fit">
                    {device !== "mobile" ? (
                      <>
                        {token ? (
                          <>
                            <div className="p-4 flex items-center gap-2 hover:text-primary-100">
                              <MaterialSymbol icon="account_circle" size={24} />
                              <span className="truncate">{userSpiltName}</span>
                            </div>
                            <ul className="w-60 py-3 border bg-white text-black-100 rounded-2xl overflow-hidden dropdown-content">
                              <li>
                                <NavLink
                                  to="/userData"
                                  className={`block w-full text-left p-4 hover:text-primary-100 hover:bg-primary-40 transition duration-300`}
                                >
                                  我的帳戶
                                </NavLink>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className={`block w-full text-left p-4 hover:text-primary-100 hover:bg-primary-40 transition duration-300`}
                                  onClick={handleLogout}
                                >
                                  登出
                                </button>
                              </li>
                            </ul>
                          </>
                        ) : (
                          <NavLink
                            to="/login"
                            className={`block text-white hover:text-primary-100 p-4 transition duration-300`}
                          >
                            會員登入
                          </NavLink>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={token ? "/userData" : "/login"}
                        className={`block text-white hover:text-primary-100 p-4 transition duration-300`}
                      >
                        {token ? "我的帳戶" : "會員登入"}
                      </NavLink>
                    )}
                  </li>
                  <li>
                    <NavLink
                      to="/rooms"
                      className={`block text-white p-4 transition duration-300 button hover:text-white bg-primary-100 hover:bg-primary-120 rounded-lg px-8`}
                    >
                      立即訂房
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
