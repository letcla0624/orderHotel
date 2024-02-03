import { useEffect, useState } from "react";
// interface
import { NewsAndFoodsList } from "@/interface/admin";
//utils
import useRWD from "@/utils/useRWD";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
// api data
import { getFoods } from "@/api/front";

export default function FootSwiper() {
  const device = useRWD();

  const [foodsList, setFoodList] = useState<NewsAndFoodsList[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getFoods();
        setFoodList(data.result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className=" bg-black-10 pl-3 pr-0 py-20 lg:px-0 lg:py-[120px]">
      <div className=" mx-auto relative">
        <img
          src="img/pc/dot.png"
          alt="dot-bg"
          className="absolute w-48 right-20 -top-40 hidden lg:block"
        />
        <div className="flex">
          <div className="lg:w-2/12 relative hidden lg:block">
            <img
              src="img/pc/line.png"
              alt="line-bg"
              className="w-[86%] xl:w-[80%] 2xl:w-[60%] 3xl:w-[49%] h-auto absolute left-0 ml-5 3xl:ml-20 -top-16"
            />
          </div>
          <div className="w-full lg:w-10/12">
            <div className="flex items-center mb-20 lg:mb-[120px]">
              <h2 className="title-text">
                佳餚
                <br />
                美饌
              </h2>
              <div className="gradient-line w-28 h-[2px] ml-10" />
            </div>
            <Swiper
              slidesPerView={3.7}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                },
                768: {
                  slidesPerView: 2.7,
                },
                1536: {
                  slidesPerView: 3.7,
                },
                1921: {
                  slidesPerView: 4.5,
                },
              }}
              spaceBetween={24}
              loop={false}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="foodSwiper"
            >
              {foodsList.map((item) => {
                return (
                  <SwiperSlide key={item._id} className=" h-fit">
                    <img
                      src={device === "mobile" ? item.smallImage : item.image}
                      alt={item.title}
                      className="relative w-full h-auto rounded-lg object-cover"
                    />
                    <div className="absolute w-full backdrop-blur-lg text-white bg-black-100/30 rounded-b-lg p-5 bottom-0">
                      <div className="flex justify-between items-center mb-5">
                        <h3 className="text-h5">{item.title}</h3>
                        <p>{item.diningTime}</p>
                      </div>
                      <p className="text-sm text-primary-60 text-multiline-ellipsis">
                        {item.description}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
