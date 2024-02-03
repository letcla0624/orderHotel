// react
import { useLocation } from "react-router-dom";
// components
import BigLogoText from "./BigLogoText";
import MainBtn from "@/components/MainBtn";

export default function BannerContent() {
  const { pathname } = useLocation();

  return (
    <div
      className={`absolute mx-auto flex flex-col lg:flex-row justify-evenly lg:justify-center lg:items-center w-full h-full p-3 lg:p-20 top-0 z-[2] 
    ${pathname === "/" ? "max-w-screen-3xl" : "max-w-screen-xl"}`}
    >
      <div className="lg:w-[48%]">
        <BigLogoText />
      </div>
      {pathname === "/" ? (
        <div className="w-4/5 md:w-3/5 lg:w-[52%] mx-auto">
          <div className="blur-bg">
            <h1 className="text-white text-h2 lg:text-h1 xl:text-[60px] 2xl:text-[80px] 3xl:text-[100px] font-bold leading-snug xl:leading-tight">
              高雄
              <br />
              豪華住宿之選
            </h1>
            <h2 className="text-black-40 md:text-h6 xl:text-h4 2xl:text-h3 tracking-wider 2xl:whitespace-nowrap my-3 md:my-5">
              我們致力於為您提供無與倫比的奢華體驗與優質服務
            </h2>
            <MainBtn
              className={`max-w-3xl md:w-3/4 lg:w-[84%] lg:mt-8 xl:mt-12 2xl:mt-16`}
              text={"立即訂房"}
              link="/rooms"
            />
          </div>
        </div>
      ) : (
        <h1 className="text-white text-center text-h3 lg:text-h1 font-bold tracking-wider">
          客房旅宿
        </h1>
      )}
    </div>
  );
}
