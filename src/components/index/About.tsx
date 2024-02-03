// utils
import useRWD from "@/utils/useRWD";

export default function About() {
  const device = useRWD();

  const img =
    device === "mobile"
      ? "bg-[url('/img/mobile/index/about/about.jpg')]"
      : "bg-[url('/img/pc/index/about/about.jpg')]";

  return (
    <div className="w-full max-h-screen sm:h-[680px] lg:h-[880px] py-20 lg:py-[120px]">
      <div
        className={`${img} bg-cover bg-center w-full h-[594px] sm:h-[480px] lg:h-[680px] p-3 lg:p-10 relative`}
      >
        <div className="max-w-screen-2xl mx-auto flex justify-center items-center pl-10 pr-5 md:px-20 lg:px-40">
          <div className="xl:w-1/5 hidden lg:block"></div>
          <div className="xl:w-4/5">
            <div className="max-w-5xl backdrop-blur-md bg-gradient-to-b from-black-bg/70 to-primary-100/80 rounded-[40px] lg:rounded-[80px] rounded-br-[0px] lg:rounded-br-[0px] text-white p-6 lg:p-20 border-l border-b border-white mt-10 xl:mt-20">
              <div className="flex items-center">
                <h2 className="text-h3 min-w-fit md:text-h1 font-bold tracking-wider">
                  關於
                  <br />
                  我們
                </h2>
                <span className="w-40 border-t-2 border-white ml-10" />
              </div>
              <article className="text-sm sm:text-base tracking-wide mt-10 lg:mt-20">
                <p className="mb-5 lg:mb-10">
                  享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                  我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
                </p>
                <p className="mb-5 lg:mb-10">
                  我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                  我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
                </p>
                <p className="mb-0">
                  在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
                </p>
                <p className="mb-0">
                  享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
