// react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
// components
import RoomHasItems from "@/components/room/RoomHasItems";
import DateRange from "@/components/room/DateRange";
import Loading from "@/components/Loading";
// utils
import { toThousands } from "@/utils/toThousands";
import useRWD from "@/utils/useRWD";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/assets/style/pagination.scss";
import "@/assets/style/indexRoomSwiper.scss";
// api data
import { getRoomId } from "@/api/front";
import useContextUserData from "@/utils/useContextUserData";
import { roomViewData } from "@/api/roomViewData";
import RoomBasicInfo from "@/components/room/RoomBasicInfo";

export default function RoomDetail() {
  // 從外層取得共用資料
  const userContextValue = useContextUserData();
  const { room, setRoom, startDate, setStartDate, endDate, setEndDate } =
    userContextValue!; // 非空斷言不會為 null 或 undefined

  const device = useRWD();
  const { id } = useParams();

  const [fetchData, setFetchData] = useState(true);
  // 取得房型
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getRoomId(id as string);
        if (data?.result) {
          setRoom(data?.result);
          localStorage.setItem("room", JSON.stringify(data?.result));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetchData(false);
      }
    })();
  }, [id, setRoom]);

  // 人數
  // 預訂人數
  const [peopleNum, setPeopleNum] = useState<number>(0);
  useEffect(() => {
    // 如果 localPeopleNum 為 null，則設定預設值
    const localPeopleNum = Number(localStorage.getItem("peopleNum"));
    if (localPeopleNum) {
      setPeopleNum(localPeopleNum);
    } else {
      setPeopleNum(2);
      localStorage.setItem("peopleNum", "2");
    }
  }, []);
  const addPeopleFn = () => {
    if (peopleNum < 4) {
      setPeopleNum(peopleNum + 1);
    }
    localStorage.setItem("peopleNum", `${peopleNum + 1}`);
  };
  const minusPeopleFn = () => {
    if (peopleNum > 1) {
      setPeopleNum(peopleNum - 1);
    }
    localStorage.setItem("peopleNum", `${peopleNum - 1}`);
  };

  return (
    <div className="w-full h-full bg-primary-10">
      {fetchData ? (
        <div className="flex justify-center items-center w-full h-screen absolute left-0 top-0">
          <Loading />
        </div>
      ) : (
        <div className="max-w-screen-3xl mx-auto pb-10 lg:px-20 lg:py-20">
          {/* 圖片 */}
          {device === "PC" ? (
            <div className="rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 gap-2">
                <img
                  src={room?.imageUrl}
                  alt="roomPhoto"
                  className="h-full object-cover"
                />
                <div className="grid grid-cols-2 gap-2">
                  {/* 要先檢查陣列是否為 undefined，才可使用淺拷貝來移除第一張圖片 */}
                  {room?.imageUrlList &&
                    [...room.imageUrlList].slice(1).map((img) => {
                      return (
                        <img
                          src={img}
                          alt="roomPhoto"
                          className="h-full object-cover"
                          key={img}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Swiper
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="allRoomsSwiper"
              >
                {room?.smallImageUrlList &&
                  [...room.smallImageUrlList].map((img) => {
                    return (
                      <SwiperSlide key={img}>
                        <img
                          src={img}
                          alt="roomPhoto"
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          )}
          {/* 主要頁面 */}
          <div className="xl:max-w-screen-2xl mx-auto px-3 xl:px-20 pt-10 lg:pt-40">
            <div className="flex flex-col lg:flex-row relative z-[2]">
              {/* 左欄 */}
              <div className="w-full lg:w-3/5 2xl:w-2/3 lg:pr-10 2xl:pr-20">
                <div className="mb-5 lg:mb-20">
                  <h1 className="text-h3 lg:text-h1 text-primary-100 font-bold tracking-wider mb-5">
                    {room.name}
                  </h1>
                  <p className="text-sm lg:text-base text-black-80 ">
                    {room.description}
                  </p>
                </div>
                <div className="mb-5 lg:mb-10">
                  <h3 className="text-base lg:text-h5 font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0">
                    房型基本資訊
                  </h3>
                  <RoomBasicInfo
                    room={room}
                    padding={"py-5 lg:py-10"}
                    border={""}
                  />
                </div>
                <RoomHasItems
                  title="房間格局"
                  margin="mb-4 lg:mb-20"
                  hasItems={roomViewData}
                />
                <RoomHasItems
                  title="房內設備"
                  margin="mb-4 lg:mb-20"
                  hasItems={room.facilityInfo}
                />
                <RoomHasItems
                  title="備品提供"
                  margin="mb-4"
                  hasItems={room.amenityInfo}
                />
                <div className="w-full lg:mt-20">
                  <h3 className="text-base lg:text-h5 font-bold tracking-wider px-3 lg:px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0">
                    訂房須知
                  </h3>
                  <ol className="list-decimal pl-7 lg:pl-8 mt-5 lg:mt-10 text-black-80 text-sm lg:text-base">
                    <li>入住時間為下午 3 點， 退房時間為上午 12 點。</li>
                    <li>
                      如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。
                    </li>
                    <li>
                      請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。
                    </li>
                    <li>
                      若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。
                    </li>
                    <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
                    <li>如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
                    <li>
                      我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。
                    </li>
                    <li>
                      請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。
                    </li>
                    <li>
                      我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。
                    </li>
                    <li>
                      為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。
                    </li>
                  </ol>
                </div>
              </div>
              {/* 右欄 */}
              <aside className="w-full lg:w-2/5 2xl:w-1/3">
                <div className="w-full bg-white rounded-2xl p-5 xl:p-10 lg:sticky lg:top-40 my-5 lg:mb-4">
                  <div className="lg:block">
                    <p className="text-base lg:text-h5 font-bold">預訂房型</p>
                    <hr className="mt-4 mb-5 lg:mb-10" />
                    <h2 className="text-h4 xl:text-h2 text-black-80 font-bold tracking-wider mb-2">
                      {room?.name}
                    </h2>
                    <p className="text-black-80 tracking-wide">
                      {room?.description}
                    </p>
                    <DateRange
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                    />
                    <div className="flex justify-between items-center">
                      <p className="font-bold tracking-wide">人數</p>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="border border-black-40 rounded-full w-14 h-14 flex justify-center items-center disabled:text-black-60"
                          onClick={minusPeopleFn}
                          disabled={peopleNum <= 1 ? true : false}
                        >
                          <MaterialSymbol icon="remove" size={24} />
                        </button>
                        <p className="text-lg font-bold px-4">{peopleNum}</p>
                        <button
                          type="button"
                          className="border border-black-40 rounded-full w-14 h-14 flex justify-center items-center disabled:text-black-60"
                          onClick={addPeopleFn}
                          disabled={peopleNum >= 4 ? true : false}
                        >
                          <MaterialSymbol icon="add" size={24} />
                        </button>
                      </div>
                    </div>
                    <p className="text-base lg:text-h5 text-primary-100 tracking-wider my-5 lg:my-10 flex items-center">
                      NT$ {toThousands(room?.price)}
                      <span className="text-xs lg:text-base text-black-60 ml-2">
                        1 / 晚
                      </span>
                    </p>
                  </div>
                  <Link
                    to={`/orderRoom/${id}`}
                    className="block w-full text-center bg-primary-100 text-white hover:bg-primary-120 rounded-lg py-4 transition duration-300"
                  >
                    立即預訂
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
