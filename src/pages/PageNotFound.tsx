import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-white text-h5 lg:text-6xl font-bold tracking-wider">
        Page NotFound
      </div>
      <Link
        to="/"
        className="text-white bg-primary-100 hover:bg-primary-120 px-10 py-3 rounded-lg transition-colors duration-300 mt-10"
      >
        回首頁
      </Link>
    </div>
  );
}
