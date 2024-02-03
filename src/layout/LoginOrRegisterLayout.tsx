import { Outlet } from "react-router-dom";

export default function LoginOrRegisterLayout() {
  return (
    <div className="flex justify-center items-center max-w-screen-3xl w-full h-full mx-auto lg:relative">
      <div className="w-full lg:w-1/2 h-[calc(100vh-120px)] hidden lg:block">
        <img
          src="/img/pc/register.jpg"
          alt="loginBg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex-col lg:flex-row">
        <img
          src="/img/pc/line3.png"
          alt="lineBg"
          className="absolute w-full lg:w-1/2 lg:h-auto top-28 lg:top-10 xl:top-20 2xl:top-48 opacity-50 object-cover"
        />
        <div className="max-w-md mx-auto p-5 relative z-[2]">
          <p className="text-sm text-primary-100">享樂酒店，誠摯歡迎</p>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
