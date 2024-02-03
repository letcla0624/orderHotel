import { Link } from "react-router-dom";
import "@/assets/style/mainBtn.scss";

export default function MainBtn({ className, text, link }) {
  return (
    <Link to={link} className={`main-btn ${className}`}>
      <span className="md:text-h6 lg:text-h5 font-bold tracking-wide">
        {text}
      </span>
      <span className="main-btn-line w-1/4 h-[1px] bg-black-100 ml-4" />
    </Link>
  );
}
