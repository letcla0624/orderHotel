import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// utils
import useRWD from "@/utils/useRWD";
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
// flowbite
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface, InstanceOptions } from "flowbite";
// sweetAlert
import { sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
import { AxiosError } from "axios";
// api data
import { orderData } from "@/interface/form";
import { getOrders, removeOrderId } from "@/api/front";
import { toDiffDays } from "@/utils/toDiffDays";
import { toThousands } from "@/utils/toThousands";
import Loading from "@/components/Loading";

export default function OrderData() {
  const device = useRWD();

  const [fetchData, setFetchData] = useState(true);

  // 取得訂單
  const [notYetOrders, setNotYetOrders] = useState([] as orderData[]);
  const [oldOrders, setOldOrders] = useState([] as orderData[]);
  const getAllOrders = useCallback(async () => {
    try {
      const { data } = await getOrders();
      if (data?.result) {
        // 即將到來訂單
        const notYetOrdersData = data.result.filter(
          (item: orderData) =>
            new Date(item?.checkInDate) > new Date() && item.status !== -1
        );
        setNotYetOrders(notYetOrdersData);

        // 舊訂單或已取消的訂單
        const oldOrdersData = data.result.filter(
          (item: orderData) =>
            new Date(item?.checkInDate) <= new Date() || item.status === -1
        );
        setOldOrders(oldOrdersData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchData(false);
    }
  }, []);

  useEffect(() => {
    getAllOrders();
    localStorage.clear();
  }, [getAllOrders]);

  // 轉換日期格式
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  // Modal
  const cancelModalRef = useRef<HTMLDivElement | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const modalOptions: ModalOptions = {
    // 必須加入 hidden，不然會有奇怪的問題
    backdropClasses: "hidden",
  };
  const instanceOptions: InstanceOptions = {
    id: "cancelModal",
    override: true,
  };
  const modal: ModalInterface = new Modal(
    cancelModalRef.current,
    modalOptions,
    instanceOptions
  );

  // 打開 Model
  const openModalFn = (id: string) => {
    modal.show();
    setOrderId(id);
    // Model 依裝置顯示位置
    device === "PC"
      ? cancelModalRef.current?.setAttribute("style", "align-items:flex-center")
      : cancelModalRef.current?.setAttribute("style", "align-items:flex-end");
  };
  // 關閉 Model
  const closeModalFn = () => {
    modal.hide();
    cancelModalRef.current?.removeAttribute("style");
    setOrderId("");
  };

  // 取消預訂訂單
  const cancelOrderFn = async () => {
    modal.hide();
    const id = orderId;

    try {
      await removeOrderId(id);
      sweetAlert("success", "取消成功", "您的訂單已取消！");
      // 重新取得訂單
      const timeOut = setTimeout(() => {
        getAllOrders();
        clearTimeout(timeOut);
      }, 1000);
    } catch (error: unknown) {
      await sweetAlertError(error as AxiosError, "取消失敗");
    } finally {
      modal.hide();
    }
  };

  return (
    <>
      {fetchData ? (
        <div className="flex justify-center items-center w-full h-screen absolute left-0 top-0">
          <Loading />
        </div>
      ) : (
        <>
          <div className="w-full lg:w-3/5 min-h-[300px]">
            {notYetOrders.length ? (
              <Swiper
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="allOrdersSwiper h-full pb-14"
              >
                {notYetOrders.map((order) => {
                  return (
                    <SwiperSlide key={order._id}>
                      <div className="bg-white rounded-3xl p-5 xl:p-10">
                        <div>
                          <p className="font-semibold tracking-wider text-black-60 mb-3">
                            預訂參考編號：{order?._id}
                          </p>
                          <h3 className="text-h5 font-bold tracking-wide">
                            即將來的行程
                          </h3>
                        </div>
                        <div className="py-10">
                          <img
                            src={order.roomId.imageUrl}
                            alt={order.roomId.name}
                            className="w-full h-64 object-cover rounded-lg overflow-hidden"
                          />
                        </div>
                        <div className="pb-10 border-b">
                          <h4 className="text-h6 text-black-80 font-bold mb-5">
                            {order.roomId.name}，
                            {toDiffDays(
                              new Date(order?.checkInDate),
                              new Date(order?.checkOutDate)
                            )}{" "}
                            晚 ｜ 住宿人數：{order?.peopleNum} 位
                          </h4>
                          <p className="text-black-80 text-sm font-semibold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0 mb-2">
                            入住：{" "}
                            {new Date(order?.checkInDate)
                              .toLocaleString("zh-TW", options)
                              .replace(/(\d{2})\D+(\d{2})/, "$1 月 $2 日")}
                            ，15:00 可入住
                          </p>
                          <p className="text-black-80 text-sm font-semibold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-black-60 after:rounded after:left-0 after:top-0 mb-2">
                            退房：{" "}
                            {new Date(order?.checkOutDate)
                              .toLocaleString("zh-TW", options)
                              .replace(/(\d{2})\D+(\d{2})/, "$1 月 $2 日")}
                            ，12:00 前退房
                          </p>
                          <p className="text-black-80 font-bold pt-5">
                            NT${" "}
                            {toThousands(
                              order.roomId.price *
                                toDiffDays(
                                  new Date(order?.checkInDate),
                                  new Date(order?.checkOutDate)
                                ) -
                                1000 *
                                  toDiffDays(
                                    new Date(order?.checkInDate),
                                    new Date(order?.checkOutDate)
                                  )
                            )}
                          </p>
                        </div>
                        <div className="pt-10">
                          <h4 className="font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-80 after:rounded after:left-0 mb-5">
                            房內設備
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-2 p-5 border rounded-lg">
                            {order.roomId?.facilityInfo.map((item) => {
                              return (
                                <div
                                  className="flex justify-start items-center min-w-[96px]"
                                  key={item.title}
                                >
                                  <MaterialSymbol
                                    icon="check"
                                    size={24}
                                    fill
                                    grade={0}
                                    className="text-primary-100 mr-2"
                                  />
                                  <p className="font-semibold">{item.title}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="pt-10">
                          <h4 className="font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-80 after:rounded after:left-0 mb-5">
                            備品提供
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-2 p-5 border rounded-lg">
                            {order.roomId?.amenityInfo.map((item) => {
                              return (
                                <div
                                  className="flex justify-start items-center min-w-[96px]"
                                  key={item.title}
                                >
                                  <MaterialSymbol
                                    icon="check"
                                    size={24}
                                    fill
                                    grade={0}
                                    className="text-primary-100 mr-2"
                                  />
                                  <p className="font-semibold">{item.title}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-5 mt-5 lg:mt-10">
                          <button
                            data-modal-target="cancelModal"
                            data-modal-toggle="cancelModal"
                            type="button"
                            className="w-1/2 p-4 rounded-lg text-center border border-primary-100 bg-white text-primary-100 hover:bg-primary-100 hover:text-white transition duration-300"
                            onClick={() => openModalFn(order._id)}
                          >
                            取消預訂
                          </button>
                          <Link
                            to={`/rooms/${order.roomId._id}`}
                            className="w-1/2 p-4 rounded-lg text-center border border-primary-100 bg-primary-100 text-white transition duration-300 hover:bg-primary-120"
                          >
                            查看詳情
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <h1 className="text-h4 font-bold text-white tracking-wider">
                目前沒有即將到來的行程...
              </h1>
            )}
          </div>
          <aside className="w-full lg:w-2/5">
            {oldOrders.length && (
              <div className="bg-white rounded-3xl p-5 xl:p-10">
                <h3 className="text-h5 font-bold tracking-wide">歷史訂單</h3>
                <ul className="max-h-[960px] overflow-scroll">
                  {oldOrders.map((order) => {
                    return (
                      <li
                        className="flex gap-5 py-10 border-b last:border-none"
                        key={order._id}
                      >
                        <div className="w-[28%]">
                          <img
                            src={order.roomId.imageUrl}
                            alt={order.roomId.name}
                            className="w-full lg:h-20 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-[72%] text-black-80 tracking-wide">
                          <p className="mb-3">預訂參考編號：{order._id}</p>
                          <h4 className="text-h6 font-bold tracking-wider mb-3">
                            {order.roomId.name}
                          </h4>
                          <p className="mb-2">
                            住宿天數：
                            {toDiffDays(
                              new Date(order?.checkInDate),
                              new Date(order?.checkOutDate)
                            )}{" "}
                            晚
                          </p>
                          <p className="mb-2">住宿人數：{order.peopleNum} 位</p>
                          <div className="my-4">
                            <p className="px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0 mb-2">
                              入住：{" "}
                              {new Date(order?.checkInDate)
                                .toLocaleString("zh-TW", options)
                                .replace(/(\d{2})\D+(\d{2})/, "$1 月 $2 日")}
                            </p>
                            <p className="px-5 relative after:absolute after:border-l-4 after:h-full after:border-black-60 after:rounded after:left-0 after:top-0 mb-2">
                              退房：{" "}
                              {new Date(order?.checkOutDate)
                                .toLocaleString("zh-TW", options)
                                .replace(/(\d{2})\D+(\d{2})/, "$1 月 $2 日")}
                            </p>
                          </div>
                          <p className="font-bold">
                            NT${" "}
                            {toThousands(
                              order.roomId.price *
                                toDiffDays(
                                  new Date(order?.checkInDate),
                                  new Date(order?.checkOutDate)
                                ) -
                                1000 *
                                  toDiffDays(
                                    new Date(order?.checkInDate),
                                    new Date(order?.checkOutDate)
                                  )
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  className="w-full p-4 rounded-lg text-center flex justify-center items-center border border-primary-100 bg-white text-primary-100 hover:bg-primary-100 hover:text-white transition duration-300 mt-5"
                >
                  查看更多
                  <MaterialSymbol
                    icon="expand_more"
                    size={24}
                    className="mr-2"
                  />
                </button>
              </div>
            )}
          </aside>

          {/* Modal */}
          <div
            id="cancelModal"
            ref={cancelModalRef}
            data-modal-backdrop="static"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden backdrop-blur-sm bg-black-bg/60 overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-50 justify-center items-center w-full h-full max-h-full"
          >
            <div className="relative w-full lg:max-w-lg max-h-full">
              <div className="relative bg-white shadow rounded-t-lg lg:rounded-lg">
                <div className="flex items-center justify-between px-3 lg:p-0 border-b lg:border-none">
                  <h3 className="text-sm font-bold lg:hidden">取消預訂</h3>
                  <button
                    type="button"
                    className="text-black-80 hover:text-primary-100 p-3 pr-0 lg:p-3 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="cancelModal"
                    onClick={closeModalFn}
                  >
                    <MaterialSymbol icon="close" size={24} />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="px-3 py-10 lg:py-14">
                  <p className="text-sm md:text-h6 font-bold text-center tracking-wider text-black-80">
                    確定要取消此房型的預訂嗎？
                  </p>
                </div>
                <div className="flex items-center p-3 gap-5 border-t">
                  <button
                    data-modal-hide="cancelModal"
                    type="button"
                    className="w-1/2 p-4 rounded-lg text-center flex justify-center items-center border border-primary-100 bg-white text-primary-100 hover:bg-primary-100 hover:text-white transition duration-300"
                    onClick={closeModalFn}
                  >
                    關閉視窗
                  </button>
                  <button
                    type="button"
                    className="w-1/2 p-4 rounded-lg text-center flex justify-center items-center border border-primary-100 bg-primary-100 text-white hover:bg-primary-120 transition duration-300"
                    onClick={cancelOrderFn}
                  >
                    確定取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
