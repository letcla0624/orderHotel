import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// components
import Input from "@/components/form/Input";
// interface
import { OrdersList, RoomsList } from "@/interface/admin";
// utils
import { sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
import ZipCodeMap from "@/utils/zipcodes";
// api data
import { AxiosError } from "axios";
import { readAllRooms, updateOrder } from "@/api/admin";
import TwCitySelector from "../TwCitySelector";

// props 的介面
interface OrderFormProps {
  text: string;
  editData: OrdersList | null;
  closeModalFn: () => void;
  setFetchData: (value: boolean) => void;
}

export default function NewsAndFoodsForm({
  text,
  editData,
  closeModalFn,
  setFetchData,
}: OrderFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OrdersList>({});

  // 取得全部房型
  const [allRooms, setAllRooms] = useState<RoomsList[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await readAllRooms();
      setAllRooms(data.result);
    })();
  }, []);

  const [city, setCity] = useState<string | undefined>("");
  const [county, setCounty] = useState<string | undefined>("");
  const zipcodeRef = useRef<HTMLInputElement | null>(null);

  // 如果是編輯有資料則帶入
  useEffect(() => {
    setValue("peopleNum", editData?.peopleNum || 0);
    setValue("userInfo.name", editData?.userInfo.name || "");
    setValue("userInfo.email", editData?.userInfo.email || "");
    setValue("userInfo.phone", editData?.userInfo.phone || "");
    setValue("roomId._id", editData?.roomId._id || "");
    setValue("roomId.name", editData?.roomId.name || "");

    setCity(
      ZipCodeMap.find(
        (item) => item.zipcode === Number(editData?.userInfo.address?.zipcode)
      )?.city as string
    );
    setCounty(
      ZipCodeMap.find(
        (item) => item.zipcode === Number(editData?.userInfo.address?.zipcode)
      )?.county as string
    );
    setValue("detail", editData?.userInfo.address.detail || "");
  }, [setValue, editData]);

  const handleChangeRoom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    allRooms.filter((item) => item._id === e.target.value);
  };

  const onSubmit: SubmitHandler<OrdersList> = async (data) => {
    console.log(data);

    try {
      if (editData?._id) {
        await updateOrder(editData._id, data);
        await sweetAlert("success", "更新成功");
        setFetchData(true);
      }

      // 關閉 Modal
      closeModalFn();
      // 清空資料
      reset();
    } catch (error) {
      console.error(error);

      await sweetAlertError(error as AxiosError, "更新失敗");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <p className="text-base py-3">訂單編號：{editData?._id}</p>
        <div className="mb-3">
          <p className="text-base mb-3">預訂房型</p>
          {editData?.roomId.name && (
            <select
              {...register("roomId.name")}
              className="form-style"
              onChange={handleChangeRoom}
            >
              {allRooms.map((item) => {
                return (
                  <option value={item.name} key={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        <Input
          register={register}
          errors={errors}
          type="number"
          id="peopleNum"
          labelText="預訂人數"
          labelColor="text-black-100"
          placeholder="請輸入人數"
          defaultValue=""
          autoFocus={true}
          rules={{
            required: {
              value: true,
              message: "人數為必填！",
            },
          }}
        />
        <Input
          register={register}
          errors={errors}
          type="text"
          id="userInfo.name"
          labelText="預訂者姓名"
          labelColor="text-black-100"
          placeholder="請輸入預訂者姓名"
          defaultValue=""
          autoFocus={true}
          rules={{
            required: {
              value: true,
              message: "預訂者姓名為必填！",
            },
          }}
        />
        <Input
          register={register}
          errors={errors}
          type="text"
          id="userInfo.email"
          labelText="預訂者信箱"
          labelColor="text-black-100"
          placeholder="請輸入預訂者信箱"
          defaultValue=""
          autoFocus={true}
          rules={{
            required: {
              value: true,
              message: "預訂者信箱為必填！",
            },
          }}
        />
        <Input
          register={register}
          errors={errors}
          type="tel"
          id="userInfo.phone"
          labelText="預訂者電話"
          labelColor="text-black-100"
          placeholder="請輸入預訂者電話"
          defaultValue=""
          autoFocus={true}
          rules={{
            required: {
              value: true,
              message: "預訂者電話為必填！",
            },
          }}
        />

        <TwCitySelector
          register={register}
          errors={errors}
          labelColor="text-black-100"
          county={city}
          district={county}
          detail=""
          zipcodeRef={zipcodeRef}
        />

        <button
          type="submit"
          className="w-full text-white bg-primary-100 focus:ring-0 focus:outline-none font-medium rounded-lg p-4 text-center disabled:text-black-60 disabled:bg-white my-5 hover:bg-primary-120 transition duration-300"
        >
          確定{text}
        </button>
      </form>
    </>
  );
}
