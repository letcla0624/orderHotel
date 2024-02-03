import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import FooterLineBg from "@/components/FooterLineBg";
// utils
import useRWD from "@/utils/useRWD";
import { toDiffDays } from "@/utils/toDiffDays";
import { toThousands } from "@/utils/toThousands";
import useContextUserData from "@/utils/useContextUserData";
// interface
import { orderData } from "@/interface/form";
// icon
import { MaterialSymbol } from "react-material-symbols";
// api data
import { getOrderId, getOrders } from "@/api/front";

export default function OrderFinished() {
  // 取得共用資料
  const userContextValue = useContextUserData();
  const { user } = userContextValue!;

  // 切割使用者名字
  const [userSpiltName, setUserSpiltName] = useState("");
  useEffect(() => {
    if (user?.name) {
      const spiltName = user?.name.split(" ");
      setUserSpiltName(spiltName[0]);
    }
  }, [user?.name]);

  const device = useRWD();

  // 取得訂單
  const [orderId, setOrderId] = useState({} as orderData);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOrders();
        if (data?.result) {
          const id = data?.result[data?.result.length - 1]._id;
          const orderIdData = await getOrderId(id as string);

          if (orderIdData?.data?.result) {
            setOrderId(orderIdData?.data?.result);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // 轉換日期格式
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  const checkInDate = new Date(orderId?.checkInDate)
    .toLocaleString("zh-TW", options)
    .replace(/(\d{2})\D+(\d{2})/, "$1 月 $2 ");
  const checkOutDate = new Date(orderId?.checkOutDate)
    .toLocaleString("zh-TW", options)
    .replace(/(\d{2})\D+(\d{2})/, "$1 月 $2 ");

  // 住幾晚
  const night = toDiffDays(
    new Date(orderId?.checkInDate),
    new Date(orderId?.checkOutDate)
  );

  // 總價
  const total = orderId.roomId?.price * night - 1000 * night;

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto px-3 py-10 lg:px-20 lg:py-20 lg:flex">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 xl:pr-20">
          <div className="pb-10 lg:pb-20 border-b">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-10 text-white mb-10">
              <MaterialSymbol
                icon="check"
                size={device === "mobile" ? 24 : 48}
                className="text-white p-2 rounded-full bg-success-100"
              />
              <h1 className="text-h3 lg:text-h1 font-semibold tracking-wider leading-normal">
                恭喜，{userSpiltName}！
                <br />
                您已預訂成功
              </h1>
            </div>
            <p className="text-base text-black-60">
              我們已發送訂房資訊及詳細內容至你的電子信箱，入住時須向櫃檯人員出示訂房人證件。
            </p>
          </div>
          <div className="py-10 lg:py-20 border-b">
            <h2 className="lg:text-h5 text-black-40 mb-10">
              立即查看您的訂單記錄
            </h2>
            <Link
              to="/orderData"
              className="block text-center lg:w-fit py-4 px-14 bg-primary-100 text-white rounded-lg hover:bg-primary-120 transition duration-300"
            >
              前往我的訂單
            </Link>
          </div>
          <div className="py-10 lg:py-20">
            <h2 className="text-h5 text-black-40 mb-10">訂房人資訊</h2>
            <ul>
              <li className="mb-5">
                <h3 className="text-black-60 mb-2">姓名</h3>
                <p className="text-black-40">{orderId.userInfo?.name}</p>
              </li>
              <li className="mb-5">
                <h3 className="text-black-60 mb-2">手機號碼</h3>
                <p className="text-black-40">{orderId.userInfo?.phone}</p>
              </li>
              <li className="mb-5">
                <h3 className="text-black-60 mb-2">電子信箱</h3>
                <p className="text-black-40">{orderId.userInfo?.email}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-2/5 xl:w-1/3">
          <div className="bg-white rounded-3xl p-5 xl:p-10">
            <div>
              <p className="tracking-wide text-black-80 mb-2">
                預訂參考編號：{orderId?._id}
              </p>
              <h3 className="text-h5 font-bold tracking-wider">即將來的行程</h3>
            </div>
            <div className="py-10">
              <img
                src={orderId.roomId?.imageUrl}
                alt={orderId.roomId?.name}
                className="w-full h-auto object-cover rounded-lg overflow-hidden"
              />
            </div>
            <div className="pb-10 border-b">
              <h4 className="text-h6 text-black-80 font-bold mb-5">
                {orderId.roomId?.name}，{night} 晚 ｜ 住宿人數：
                {orderId?.peopleNum} 位
              </h4>
              <p className="text-black-80 text-sm font-semibold tracking-wide px-3 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0 mb-2">
                入住： {checkInDate}，15:00 可入住
              </p>
              <p className="text-black-80 text-sm font-semibold tracking-wide px-3 relative after:absolute after:border-l-4 after:h-full after:border-black-60 after:rounded after:left-0 after:top-0 mb-2">
                退房： {checkOutDate}，12:00 前退房
              </p>
              <p className="text-black-80 font-bold pt-5">
                NT$ {toThousands(total)}
              </p>
            </div>
            <div className="pt-10">
              <h4 className="font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 mb-5">
                房內設備
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 p-5 border rounded-lg">
                {orderId.roomId?.facilityInfo.map((item) => {
                  return (
                    <div
                      className="flex justify-start items-center min-w-[96px]"
                      key={item.title}
                    >
                      <MaterialSymbol
                        icon="check"
                        size={24}
                        fill
                        className="text-primary-100 mr-2"
                      />
                      <p className="font-semibold">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-10">
              <h4 className="font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 mb-5">
                備品提供
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 p-5 border rounded-lg">
                {orderId.roomId?.amenityInfo.map((item) => {
                  return (
                    <div
                      className="flex justify-start items-center min-w-[96px]"
                      key={item.title}
                    >
                      <MaterialSymbol
                        icon="check"
                        size={24}
                        fill
                        className="text-primary-100 mr-2"
                      />
                      <p className="font-semibold">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLineBg />
    </div>
  );
}
