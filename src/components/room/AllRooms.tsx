// react
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import RoomBasicInfo from "./RoomBasicInfo";
// utils
import useRWD from "@/utils/useRWD";
import { toThousands } from "@/utils/toThousands";
// interface
import { RoomsList } from "@/interface/admin";
// icon
import { MaterialSymbol } from "react-material-symbols";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/assets/style/pagination.scss";
import "@/assets/style/allRoomsSwiper.scss";
// api data
import { getRooms } from "@/api/front";

export default function AllRooms() {
  const device = useRWD();

  // 取得全部房型
  const [roomsList, setRoomsList] = useState<RoomsList[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getRooms();
        setRoomsList(data.result);
        localStorage.clear();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {roomsList.map((item) => {
        return (
          <div
            className="bg-white rounded-3xl lg:rounded-2xl flex flex-col lg:flex-row overflow-hidden mb-10"
            key={item._id}
          >
            <div className="w-full lg:w-3/5">
              <Swiper
                pagination={{
                  clickable: true,
                }}
                navigation={device === "PC" && true}
                modules={[Navigation, Pagination]}
                className="allRoomsSwiper h-full"
              >
                {item.imageUrlList.map((img) => {
                  return (
                    <SwiperSlide key={img}>
                      <img
                        src={img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="w-full lg:w-2/5 p-5 xl:p-10">
              <h2 className="text-h4 lg:text-h2 font-bold tracking-wider mb-2 lg:mb-5">
                {item.name}
              </h2>
              <p className="text-sm lg:text-base text-black-80">
                {item.description}
              </p>
              <RoomBasicInfo
                room={item}
                padding={"py-5 lg:py-10"}
                border={"border border-primary-40"}
              />
              <div className="gradient-line w-full h-[2px]" />
              {/* Link to 這邊要轉成字串 */}
              <Link to={`${item._id}`}>
                <div className="flex justify-between items-center pt-10">
                  <h3 className="lg:text-h5 font-bold text-primary-100">
                    NT$ {toThousands(item.price as number)}
                  </h3>

                  <MaterialSymbol
                    icon="arrow_forward"
                    size={24}
                    className="text-primary-100"
                  />
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
