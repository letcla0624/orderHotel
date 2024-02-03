// components
import FooterLineBg from "@/components/FooterLineBg";
// interface
import { IconList } from "@/interface/List";
import useRWD from "@/utils/useRWD";
// icon
import { MaterialSymbol } from "react-material-symbols";

export default function Traffic() {
  const transportList: IconList[] = [
    {
      id: 1,
      icon: "directions_car",
      title: "自行開車",
      description:
        "如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。",
    },
    {
      id: 2,
      icon: "train",
      title: "高鐵/火車",
      description:
        "如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。",
    },
    {
      id: 3,
      icon: "airport_shuttle",
      title: "禮賓車接送",
      description:
        "承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567",
    },
  ];

  const device = useRWD();

  return (
    <div className="pt-20 lg:pt-[120px]">
      <div className="max-w-screen-xl mx-auto px-3 pb-20">
        <div className="flex items-center mb-20 lg:mb-[120px]">
          <h2 className="title-text">
            交通
            <br />
            方式
          </h2>
          <div className="gradient-line w-28 h-[2px] ml-10" />
        </div>
        <p className="text-primary-40 mb-5">台灣高雄市新興區六角路123號</p>
        <div className="rounded-3xl lg:rounded-lg overflow-hidden mb-10">
          {device === "PC" ? (
            <img
              src="img/pc/index/map.jpg"
              alt="地圖"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="img/mobile/index/map.jpg"
              alt="地圖"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          {transportList.map((item) => {
            return (
              <div className="w-full lg:w-1/3" key={item.title}>
                <MaterialSymbol
                  icon={item.icon}
                  size={80}
                  fill
                  className="text-primary-100"
                />
                <h3 className="text-h5 font-semibold text-white tracking-wider mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-white">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <FooterLineBg />
    </div>
  );
}
