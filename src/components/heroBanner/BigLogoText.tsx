// react
import { useLocation } from "react-router-dom";

export default function BigLogoText() {
  const { pathname } = useLocation();

  return (
    <div className="text-center lg:text-left">
      <p className="font-semibold text-primary-80 lg:text-primary-100 text-h4 md:text-h2 tracking-wider">
        享樂酒店
      </p>
      <p className="text-primary-80 lg:text-primary-100 text-sm sm:text-lg md:text-h5 tracking-wider sm:my-2">
        Enjoyment Luxury Hotel
      </p>
      <div
        className={`gradient-line w-[2px] h-16 md:h-24 lg:w-3/4 lg:h-[2px] mt-5 sm:mt-10 mx-auto lg:mx-0 ${
          pathname === "/rooms" && " 2xl:w-[86%]"
        }`}
      />
    </div>
  );
}
