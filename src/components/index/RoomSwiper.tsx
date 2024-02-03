import { useEffect, useState } from "react";
// components
import MainBtn from "@/components/MainBtn";
// utils
import { toThousands } from "@/utils/toThousands";
import useRWD from "@/utils/useRWD";
// interface
import { RoomsList } from "@/interface/admin";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/assets/style/pagination.scss";
import "@/assets/style/indexRoomSwiper.scss";
// api data
import { getRooms } from "@/api/front";

export default function RoomSwiper() {
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
    <div className="w-full relative">
      <div className="max-w-screen-2xl 3xl:mx-auto mt-10 pb-20 lg:py-[120px]">
        <img
          src="img/mobile/line.png"
          alt="lineBg"
          className="mb-10 sm:mb-20 w-9/12 h-24 ml-auto lg:hidden"
        />
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="roomSwiper pb-16 lg:pb-0"
        >
          {roomsList.map((item) => {
            return (
              <SwiperSlide key={item._id}>
                <div className="flex flex-col lg:flex-row justify-between lg:items-end px-3 lg:px-0 lg:h-[900px]">
                  <div className="lg:w-1/2 h-full">
                    <Swiper
                      pagination={{
                        clickable: true,
                      }}
                      autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                      }}
                      effect={"fade"}
                      loop={true}
                      modules={[Pagination, Autoplay, EffectFade]}
                      className="mySwiper h-full"
                    >
                      {device === "mobile"
                        ? item.smallImageUrlList?.map((pic) => {
                            return (
                              <SwiperSlide key={pic}>
                                <img
                                  src={pic}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-r-lg 3xl:rounded-lg"
                                />
                              </SwiperSlide>
                            );
                          })
                        : item.imageUrlList.map((pic) => {
                            return (
                              <SwiperSlide key={pic}>
                                <img
                                  src={pic}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-r-lg 3xl:rounded-lg"
                                />
                              </SwiperSlide>
                            );
                          })}
                    </Swiper>
                  </div>
                  <div className="lg:w-1/2">
                    <img
                      src="img/mobile/bg.png"
                      alt="bg-line"
                      className="w-full mt-5 absolute lg:hidden z-0"
                    />
                    <div className="py-6 lg:p-20 2xl:pr-0">
                      <div
                        className="text-white text-h4 lg:text-h2 font-bold tracking-wider mb-2 lg:mb-5"
                        data-swiper-parallax="-300"
                      >
                        {item.name}
                      </div>
                      <div
                        className="text-sm lg:text-base tracking-wide text-black-60 mb-5 lg:mb-10"
                        data-swiper-parallax="-100"
                      >
                        {item.description}
                      </div>
                      <div
                        className="text-white text-h5 lg:text-h3 tracking-wider "
                        data-swiper-parallax="-200"
                      >
                        NT$ {toThousands(item.price as number)}
                      </div>
                      <MainBtn
                        className={`lg:max-w-2xl lg:mt-8 xl:mt-10 relative z-[1]`}
                        text={"查看更多"}
                        link={`/rooms/${item._id}`}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <img
          src="img/pc/line3.png"
          alt="lineBg"
          className="w-2/3 h-40 ml-auto absolute top-40 right-0 hidden lg:block"
        />
        <img
          src="img/pc/bg.png"
          alt="lineBg"
          className="w-full h-auto  absolute top-80 left-0 hidden lg:block"
        />
      </div>
    </div>
  );
}
