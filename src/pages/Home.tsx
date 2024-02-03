// components
import Banner from "@/components/heroBanner/Banner";
import News from "@/components/index/News";
import About from "@/components/index/About";
import RoomSwiper from "@/components/index/RoomSwiper";
import FoodSwiper from "@/components/index/FoodSwiper";
import Traffic from "@/components/index/Traffic";

export default function Home() {
  return (
    <>
      <Banner />
      <News />
      <About />
      <RoomSwiper />
      <FoodSwiper />
      <Traffic />
    </>
  );
}
