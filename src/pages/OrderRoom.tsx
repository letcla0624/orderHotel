// react
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// components
import RoomHasItems from "@/components/room/RoomHasItems";
import Input from "@/components/form/Input";
import TwCitySelector from "@/components/TwCitySelector";
import RoomBasicInfo from "@/components/room/RoomBasicInfo";
import DateRange from "@/components/room/DateRange";
import OrderWaiting from "@/components/room/OrderWaiting";
// utils
import useContextUserData from "@/utils/useContextUserData";
import { toThousands } from "@/utils/toThousands";
import { toDiffDays } from "@/utils/toDiffDays";
import ZipCodeMap from "@/utils/zipcodes";
// interface
import { RoomsList } from "@/interface/admin";
import { newOrderData } from "@/interface/form";
// icon
import { MaterialSymbol } from "react-material-symbols";
// sweetAlert
import { sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
import { AxiosError } from "axios";
// api data
import { roomViewData } from "@/api/roomViewData";
import { addOrder, getRooms } from "@/api/front";

export default function RoomDetail() {
  // 手機版時預定房型面板浮動在底部
  const orderPadRef = useRef<HTMLDivElement | null>(null);
  const orderRoomText = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop >= 0) {
        orderPadRef.current?.classList.remove("hidden");
      } else {
        orderPadRef.current?.classList.add("hidden");
      }

      if (scrollTop >= 1400) {
        orderPadRef.current?.classList.add("relative", "mb-5", "rounded-lg");
        orderPadRef.current?.classList.remove("fixed", "mb-0", "shadow-minus");
        orderRoomText.current?.classList.remove("hidden");
      } else {
        orderPadRef.current?.classList.remove("relative", "mb-5", "rounded-lg");
        orderPadRef.current?.classList.add("fixed", "mb-0", "shadow-minus");
        orderRoomText.current?.classList.add("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  // 返回詳細房型
  const backToFn = () => {
    navigate(`/rooms/${id}`);
  };

  // 取得共用資料
  const userContextValue = useContextUserData();
  const { user } = userContextValue!; // 斷言不會為 null 或 undefined

  // 抓取日期，但要重新設定日期格式
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    const localStartDate = localStorage.getItem("startDate");
    const localEndDate = localStorage.getItem("endDate");

    // 如果 localStartDate 或 localEndDate 為 null，則設定預設值
    if (localStartDate && localEndDate) {
      setStartDate(new Date(localStartDate));
      setEndDate(new Date(localEndDate));
    }
  }, []);

  // 取得原始起迄日期(要轉換日期格式)
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  } as Intl.DateTimeFormatOptions;
  const formattedStartDate = new Date(startDate as unknown as Date)
    .toLocaleDateString("zh-TW", options)
    .replace(/(\d{4})\D+(\d{2})\D+(\d{2})/, "$1 年 $2 月 $3 ");
  const formattedEndDate = new Date(endDate as unknown as Date)
    .toLocaleDateString("zh-TW", options)
    .replace(/(\d{4})\D+(\d{2})\D+(\d{2})/, "$1 年 $2 月 $3 ");

  // 取得全部房型
  const [roomsList, setRoomsList] = useState<RoomsList[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await getRooms();
      setRoomsList(data.result);
    })();
  }, []);

  // 取得 localeStorage 的房型
  const localRoom = JSON.parse(localStorage.getItem("room") as string);

  // 改變房型
  const [editRoom, setEditRoom] = useState(false);
  const changeRoomBtn = () => {
    if (editRoom) setEditRoom(false);
    else setEditRoom(true);
  };
  const handleChangeRoom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 篩選出 id 相同的房型
    const changeRoom = roomsList.filter((item) => item._id === e.target.value);
    localStorage.setItem("room", JSON.stringify(changeRoom[0]));
    navigate(`/orderRoom/${e.target.value}`);
  };

  // 改變人數
  const peopleNum = localStorage.getItem("peopleNum");
  const peopleList: number[] = [];
  for (let i = 1; i <= 4; i++) {
    peopleList.push(i);
  }
  const [editPeople, setEditPeople] = useState(false);
  const ChangePeopleBtn = () => {
    if (editPeople) setEditPeople(false);
    else setEditPeople(true);
  };
  const handleChangePeople = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem("peopleNum", e.target.value);
  };

  // 編輯日期按鈕
  const [editDate, setEditDate] = useState(false);
  const ChangeDateBtn = () => {
    if (editDate) setEditDate(false);
    else setEditDate(true);
  };

  // 價格計算
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const liveDays = toDiffDays(startDate, endDate) || 0;
  const allPrice = localRoom.price * liveDays;
  useEffect(() => {
    if (liveDays) {
      setDiscount(1000 * liveDays);
      return setTotal(allPrice - discount);
    }

    return setTotal(0);
  }, [discount, liveDays, allPrice]);

  // 表單
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<newOrderData>({
    mode: "onTouched",
  });

  // 套用會員資料
  const [city, setCity] = useState<string | undefined>("");
  const [county, setCounty] = useState<string | undefined>("");
  const zipcodeRef = useRef<HTMLInputElement | null>(null);
  const [useUserData, setUseUserData] = useState(false);
  const getUserData = () => {
    setUseUserData(true);

    // 設定地址
    if (userContextValue?.user.address) {
      setCity(
        ZipCodeMap.find(
          (item) => item.zipcode === Number(user?.address?.zipcode)
        )?.city as string
      );
      setCounty(
        ZipCodeMap.find(
          (item) => item.zipcode === Number(user?.address?.zipcode)
        )?.county as string
      );
    }
    // 帶入會員資料
    setValue("name", user?.name || "");
    setValue("phone", user?.phone || "");
    setValue("email", user?.email || "");
    setValue("detail", user?.address.detail || "");
  };

  // 判斷表單送出是否被觸發
  const navElement: HTMLElement | null = document.querySelector("nav");
  const handleSendToggle = (nextState: boolean) => {
    if (nextState) {
      document.body.classList.add("overflow-hidden");
      if (navElement) {
        navElement.classList.remove("z-50");
      }
    } else {
      document.body.classList.remove("overflow-hidden");
      if (navElement) {
        navElement.classList.add("z-50");
      }
    }
  };

  // 表單送出
  const [isSend, setIsSend] = useState(false);
  const onSubmit: SubmitHandler<newOrderData> = async (orderData) => {
    setIsSend(true);
    handleSendToggle(true);

    // 日期格式(送出格式搞很久)
    const checkInDate = `${new Date(startDate)?.getFullYear()}/${(
      new Date(startDate)?.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${new Date(startDate)
      ?.getDate()
      .toString()
      .padStart(2, "0")}`;
    const checkOutDate = `${new Date(endDate)?.getFullYear()}/${(
      new Date(endDate)?.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${new Date(endDate)
      ?.getDate()
      .toString()
      .padStart(2, "0")}`;

    // 使用 orderData 裡面的值沒有加上空字串，formData 會報錯
    const formData = {
      roomId: localRoom._id,
      checkInDate,
      checkOutDate,
      peopleNum: Number(peopleNum),
      userInfo: {
        address: {
          zipcode: Number(zipcodeRef.current?.value),
          detail: orderData.detail || "",
        },
        name: orderData.name || "",
        phone: orderData.phone || "",
        email: orderData.email || "",
      },
    };

    try {
      await addOrder(formData);
      // 1秒後跳轉到首頁
      await sweetAlert("success", "預訂成功");
      const timeOut = setTimeout(() => {
        navigate("/orderFinished");
        localStorage.clear();
        clearTimeout(timeOut);
      }, 1000);
    } catch (error: unknown) {
      await sweetAlertError(error as AxiosError, "預訂失敗");
    } finally {
      setIsSend(false);
      handleSendToggle(false);
    }
  };

  return (
    <>
      <div className="w-full h-full bg-primary-10">
        <div className="max-w-screen-3xl mx-auto py-10 lg:px-20 lg:py-20">
          <div className="xl:max-w-screen-2xl mx-auto px-3 xl:px-20 ">
            <button
              type="button"
              className="block text-h3 font-bold tracking-wider mb-10"
              onClick={backToFn}
            >
              <MaterialSymbol
                icon="arrow_back_ios_new"
                size={24}
                className="pr-3"
              />
              確認訂房資訊
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col lg:flex-row">
                {/* 左欄 */}
                <div className="w-full lg:w-3/5 2xl:w-2/3 lg:pr-10 2xl:pr-20">
                  <div className="mb-5 lg:mb-10">
                    <h1 className="text-h4 font-bold tracking-wider mb-10">
                      訂房資訊
                    </h1>
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-10/12 lg:w-1/2">
                        <h2 className="text-sm lg:text-base font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0 mb-2">
                          選擇房型
                        </h2>
                        {localRoom._id && editRoom ? (
                          <select
                            {...register("roomId", { required: true })}
                            className="form-style"
                            defaultValue={localRoom._id}
                            onChange={handleChangeRoom}
                          >
                            {roomsList.map((item) => {
                              return (
                                <option value={item._id} key={item._id}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <p>{localRoom.name}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="font-bold underline whitespace-nowrap ml-3"
                        onClick={changeRoomBtn}
                      >
                        {editRoom ? "完成" : "編輯"}
                      </button>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="">
                        <h2 className="text-sm lg:text-base font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0 mb-2">
                          訂房日期
                        </h2>
                        {editDate ? (
                          <DateRange
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                          />
                        ) : (
                          <div>
                            <p className="mb-2 tracking-wide">
                              入住：{formattedStartDate}
                            </p>
                            <p className="tracking-wide">
                              退房：{formattedEndDate}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        className="font-bold underline whitespace-nowrap ml-3"
                        onClick={ChangeDateBtn}
                      >
                        {editDate ? "完成" : "編輯"}
                      </button>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-10/12 lg:w-1/2">
                        <h2 className="text-sm lg:text-base font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0 mb-2">
                          房客人數
                        </h2>
                        {editPeople ? (
                          <select
                            {...register("peopleNum", { required: true })}
                            className="form-style"
                            defaultValue={peopleNum as string}
                            onChange={handleChangePeople}
                          >
                            {peopleList.map((item) => {
                              return (
                                <option value={item} key={item}>
                                  {item} 人
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <p>{peopleNum} 人</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="font-bold underline whitespace-nowrap ml-3"
                        onClick={ChangePeopleBtn}
                      >
                        {editPeople ? "完成" : "編輯"}
                      </button>
                    </div>
                  </div>
                  <div className="border-t-2 border-b-2 border-black-60/50 py-10">
                    <div className="flex justify-between items-center mb-10">
                      <h2 className="text-h4 font-bold tracking-wider">
                        訂房人資訊
                      </h2>
                      <button
                        type="button"
                        className=" text-primary-100 underline"
                        onClick={getUserData}
                      >
                        套用會員資料
                      </button>
                    </div>
                    <Input
                      register={register}
                      errors={errors}
                      type="text"
                      id="name"
                      labelText="姓名"
                      labelColor="text-black-100"
                      placeholder="請輸入姓名"
                      defaultValue={""}
                      autoFocus={false}
                      rules={{
                        required: {
                          value: true,
                          message: "姓名為必填！",
                        },
                      }}
                    />
                    <Input
                      register={register}
                      errors={errors}
                      type="tel"
                      id="phone"
                      labelText="手機號碼"
                      labelColor="text-black-100"
                      placeholder="請輸入手機號碼"
                      defaultValue={""}
                      autoFocus={false}
                      rules={{
                        required: {
                          value: true,
                          message: "手機號碼為必填！",
                        },
                        maxLength: {
                          value: 10,
                          message: "手機號碼為 10 碼！",
                        },
                        pattern: {
                          value: /^09\d{8}$/,
                          message: "手機號碼格式錯誤，應為 09XXXXXXXX！",
                        },
                      }}
                    />
                    <Input
                      register={register}
                      errors={errors}
                      type="email"
                      id="email"
                      labelText="電子信箱"
                      labelColor="text-black-100"
                      placeholder="hello@example.com"
                      defaultValue={""}
                      autoFocus={false}
                      rules={{
                        required: {
                          value: true,
                          message: "電子信箱為必填！",
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "電子信箱格式錯誤！",
                        },
                      }}
                    />
                    <TwCitySelector
                      register={register}
                      errors={errors}
                      labelColor="text-black-100"
                      county={useUserData ? city : "臺北市"}
                      district={useUserData ? county : "中正區"}
                      detail={""}
                      zipcodeRef={zipcodeRef}
                    />
                  </div>
                  <div className="my-5 lg:my-10">
                    <h2 className="text-h4 font-bold tracking-wider mb-10">
                      房間資訊
                    </h2>
                    <div className="mb-5 lg:mb-6">
                      <h3 className="text-base lg:text-h5 font-bold tracking-wider px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0 mb-6">
                        房型基本資訊
                      </h3>
                      <RoomBasicInfo
                        room={localRoom}
                        padding={""}
                        border={""}
                      />
                    </div>
                    <RoomHasItems
                      title="房間格局"
                      margin="mb-4 lg:mb-6"
                      hasItems={roomViewData}
                    />
                    <RoomHasItems
                      title="房內設備"
                      margin="mb-4 lg:mb-6"
                      hasItems={localRoom.facilityInfo}
                    />
                    <RoomHasItems
                      title="備品提供"
                      margin="mb-4 lg:mb-6"
                      hasItems={localRoom.amenityInfo}
                    />
                  </div>
                </div>
                {/* 右欄 */}
                <aside className="w-full lg:w-2/5 2xl:w-1/3">
                  <div
                    className="w-full bg-white lg:rounded-2xl p-5 xl:p-10 hidden lg:block fixed bottom-0 left-0 lg:sticky lg:top-40 mb-0 lg:mb-10 z-[2] shadow-minus lg:shadow-none"
                    ref={orderPadRef}
                  >
                    <div className="hidden lg:block" ref={orderRoomText}>
                      <img
                        src={localRoom.imageUrl}
                        alt={localRoom.name}
                        className="rounded-lg"
                      />
                      <div className="py-5 lg:py-10">
                        <h2 className="text-h6 lg:text-h4 font-bold tracking-wider mb-5">
                          價格詳情
                        </h2>
                        <div className="flex justify-between items-center mb-4">
                          <p className="flex items-center gap-1 ">
                            <span>NT$ {toThousands(localRoom.price)}</span>
                            <MaterialSymbol
                              icon="close"
                              size={16}
                              className="text-black-80"
                            />
                            <span className="text-black-80">{liveDays} 晚</span>
                          </p>
                          <p>NT$ {toThousands(allPrice)}</p>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <p>住宿折扣</p>
                          <p className="text-primary-80">
                            - NT$ {toThousands(discount)}
                          </p>
                        </div>
                        <hr className="my-5" />
                        <div className="flex justify-between font-bold">
                          <p>總價</p>
                          <p>NT$ {toThousands(total)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-black-80 w-1/2 lg:hidden">
                        {/* <p>總價</p> */}
                        <p>
                          NT$ {toThousands(total)} / {liveDays} 晚
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="block w-1/2 lg:w-full text-center bg-primary-100 text-white hover:bg-primary-120 rounded-lg py-4 transition duration-300"
                      >
                        確認訂房
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isSend && <OrderWaiting />}
    </>
  );
}
