import { NavLink } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
// interface
import { Icon } from "@/interface/Icon";

export default function SideMenu() {
  const adminMenuList = [
    {
      id: 1,
      title: "儀表板",
      icon: "dashboard",
      link: "/admin",
    },
    {
      id: 2,
      title: "最新消息管理",
      icon: "newsmode",
      link: "/admin/news",
    },
    {
      id: 3,
      title: "美味佳餚管理",
      icon: "ramen_dining",
      link: "/admin/foods",
    },
    {
      id: 4,
      title: "房型管理",
      icon: "bed",
      link: "/admin/rooms",
    },
    {
      id: 5,
      title: "訂單管理",
      icon: "home_storage",
      link: "/admin/orders",
    },
    {
      id: 6,
      title: "回前台",
      icon: "logout",
      link: "/",
    },
  ];

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:-translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
          <div className="mt-10 mb-5 lg:mt-0">
            <img
              src="/img/logo2.png"
              alt="logo"
              className="max-w-[196px] mx-auto"
            />
          </div>
          <button
            type="button"
            data-drawer-hide="default-sidebar"
            aria-controls="default-sidebar"
            className="bg-transparent hover:bg-gray-100 rounded-lg p-3 absolute top-3 end-3 inline-flex items-center lg:hidden"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <ul className="space-y-2 admin-menu">
            {adminMenuList.map((item) => {
              return (
                <li key={item.title}>
                  {/* NavLink 要加入 end 屬性才可以將匹配限制為嚴格匹配 */}
                  <NavLink
                    to={item.link}
                    end
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MaterialSymbol
                      icon={item.icon as Icon}
                      size={24}
                      weight={200}
                      className="text-black-60"
                    />
                    <span className="ms-3">{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
