import { useEffect, useState } from "react";
// components
import DotBg from "@/components/DotBg";
// interface
import { NewsAndFoodsList } from "@/interface/admin";
// api data
import { getNews } from "@/api/front";
import useRWD from "@/utils/useRWD";

export default function News() {
  const device = useRWD();
  const [newsData, setNewsData] = useState<NewsAndFoodsList[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getNews();
        setNewsData(data.result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className=" bg-primary-10 px-3 py-20 lg:p-[120px]">
      <div className="relative max-w-screen-xl mx-auto">
        <div className="relative lg:flex z-[2]">
          <div className="lg:w-2/12 mb-10">
            <h2 className="title-text mt-5">
              最新
              <br />
              消息
            </h2>
            <div className="gradient-line w-28 h-[2px] mt-5 lg:mt-10" />
          </div>
          <div className="lg:w-10/12">
            {newsData.map((item) => {
              return (
                <a
                  href="#"
                  className="flex flex-col md:flex-row items-center mb-5 lg:mb-0 md:py-5"
                  key={item._id}
                >
                  <img
                    className="object-cover rounded-lg w-full md:w-5/12"
                    src={device === "mobile" ? item.smallImage : item.image}
                    alt={item.title}
                  />
                  <div className="flex flex-col justify-between py-5 md:p-5 leading-normal md:w-7/12">
                    <h3 className="text-h4 md:text-h3 font-bold tracking-wide text-black-100 dark:text-white mb-2 md:mb-5">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base leading-5 text-black-60 text-justify">
                      {item.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <DotBg mainClass="top-0 right-10 2xl:-right-24" />
        <DotBg mainClass="-bottom-28 left-10 2xl:-left-24 lg:-bottom-40" />
      </div>
    </div>
  );
}
