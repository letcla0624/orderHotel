// react
import { Outlet } from "react-router-dom";
// components
import SideMenu from "@/components/admin/SideMenu";
import TopBar from "@/components/admin/TopBar";

export default function AdminLayout() {
  return (
    <>
      <div className="flex flex-col lg:flex-row bg-white h-screen">
        <SideMenu />

        <div className="lg:w-full bg-white">
          <div className="relative bg-black-40 min-h-screen lg:pl-64">
            <TopBar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
