// components
import Banner from "@/components/heroBanner/Banner";
import AllRooms from "@/components/room/AllRooms";

export default function Rooms() {
  return (
    <>
      <Banner />
      <div className=" bg-primary-10 px-3 py-10 md:p-10 lg:p-[120px]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10 lg:mb-20">
            <p className="lg:text-h6 tracking-wide">房型選擇</p>
            <h1 className="text-h3 lg:text-h1 font-bold text-primary-100 tracking-wider mt-2 lg:mt-5">
              各種房型，任您挑選
            </h1>
          </div>
          <AllRooms />
        </div>
      </div>
    </>
  );
}
