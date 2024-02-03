// components
import BannerContent from "./BannerContent";

// utils
import useRWD from "@/utils/useRWD";

// interface
import { SwiperList } from "@/interface/List";

// swiper
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/assets/style/pagination.scss";
import "@/assets/style/indexBanner.scss";

export default function Banner() {
  const bannerList: SwiperList[] = [
    {
      id: 1,
      imageBig: "img/pc/index/banner/banner1.jpg",
      imageSmall: "img/mobile/index/banner/banner1.jpg",
      alt: "banner1",
    },
    {
      id: 2,
      imageBig: "img/pc/index/banner/banner2.jpg",
      imageSmall: "img/mobile/index/banner/banner2.jpg",
      alt: "banner2",
    },
    {
      id: 3,
      imageBig: "img/pc/index/banner/banner3.jpg",
      imageSmall: "img/mobile/index/banner/banner3.jpg",
      alt: "banner3",
    },
    {
      id: 4,
      imageBig: "img/pc/index/banner/banner4.jpg",
      imageSmall: "img/mobile/index/banner/banner4.jpg",
      alt: "banner4",
    },
    {
      id: 5,
      imageBig: "img/pc/index/banner/banner5.jpg",
      imageSmall: "img/mobile/index/banner/banner5.jpg",
      alt: "banner5",
    },
  ];

  const device = useRWD();

  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={false}
      pagination={{
        clickable: true,
        clickableClass: "banner-pagination",
      }}
      modules={[EffectFade, Autoplay, Navigation, Pagination]}
      className="relative max-h-screen flex justify-center"
    >
      {bannerList.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <img
              src={
                device === "PC"
                  ? (item.imageBig as string)
                  : (item.imageSmall as string)
              }
              alt={item.alt}
              className="w-full h-full object-cover brightness-[0.4]"
            />
          </SwiperSlide>
        );
      })}
      <BannerContent />
    </Swiper>
  );
}
