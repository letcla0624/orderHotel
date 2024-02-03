// react
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
      <img
        src="img/logo.png"
        className="h-12 md:h-[72px]"
        alt="orderHotel Logo"
      />
    </Link>
  );
}
