import { useEffect, useRef } from "react";
import {
  useForm,
  SubmitHandler,
  useWatch,
  Controller,
  DefaultValues,
} from "react-hook-form";
// components
import Input from "@/components/form/Input";
import TwCitySelector from "@/components/TwCitySelector";
import SaveOrCancelBtn from "./SaveOrCancelBtn";
// utils
import { confirmAlert, sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
// interface
import { UpdateUserData, UserRegister } from "@/interface/form";
//台灣地址
import ZipCodeMap from "@/utils/zipcodes";
// datepicker
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/style/reactDatePicker.scss";
import tw from "date-fns/locale/zh-TW";
registerLocale("el", tw);
// api data
import { updateUser } from "@/api/users";
import { AxiosError } from "axios";

export default function ResetPasswordForm({
  setRestUserData,
  user,
  updateUserDataFn,
}) {
  // 表單預設資料
  const defaultValues: DefaultValues<UserRegister> = {
    name: user.name,
    phone: user.phone,
    birthday: user.birthday, // ISO 8601 的日期字串格式
    address: {
      zipcode: user.address.zipcode,
      detail: user.address.detail,
    },
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateUserData>({
    mode: "onTouched",
    defaultValues,
  });

  // 更新
  const zipcodeRef = useRef<HTMLInputElement | null>(null);
  const onSubmit: SubmitHandler<UpdateUserData> = async (resetUserData) => {
    // 設定更新資料
    const updateUserData: UpdateUserData = {
      ...user,
      userId: user._id,
      name: resetUserData.name,
      phone: resetUserData.phone,
      birthday: resetUserData.birthday, // 後端會處理成 ISO 8601 的日期字串格式
      address: {
        zipcode: zipcodeRef.current?.value,
        detail: resetUserData.detail,
      },
    };

    try {
      const result = await confirmAlert("warning", "確定修改資料？");
      if (result.isConfirmed) {
        await updateUser(updateUserData);
        await sweetAlert("success", "資料更新成功");
        updateUserDataFn(updateUserData);
        setRestUserData(false);
      }
    } catch (error: unknown) {
      await sweetAlertError(error as AxiosError, "資料更新失敗");
    }
  };

  // 欄位有值送出按鈕才會開啟
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const watchForm = useWatch({ control });
  useEffect(() => {
    watchForm.name?.length && watchForm.phone?.length
      ? submitBtnRef.current?.removeAttribute("disabled")
      : submitBtnRef.current?.setAttribute("disabled", "disabled");
  }, [watchForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        register={register}
        errors={errors}
        type="text"
        id="name"
        labelText="姓名"
        labelColor="text-black-100"
        placeholder="請輸入姓名"
        defaultValue=""
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
        defaultValue=""
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
      <template className="block w-full mb-5">
        <label className=" block mb-2">生日</label>
        <Controller
          control={control}
          name="birthday"
          render={({ field: { value, ...fieldProps } }) => {
            return (
              <ReactDatePicker
                {...fieldProps}
                className={`w-full rounded-lg px-3 py-4 border ${
                  errors.birthday
                    ? "error-form"
                    : "placeholder-black-100/20 border-black-40 focus:border-primary-100 focus:ring focus:ring-primary-100 focus:outline-none"
                }`}
                maxDate={new Date()}
                placeholderText="年/月/日"
                // 字串要轉成日期格式
                selected={new Date(value)}
                locale={tw}
                dateFormat="yyyy/MM/dd"
              />
            );
          }}
        />
      </template>
      <TwCitySelector
        register={register}
        errors={errors}
        labelColor="text-black-100"
        county={
          ZipCodeMap.find(
            (item) => item.zipcode === Number(user?.address.zipcode)
          )?.city
        }
        district={
          ZipCodeMap.find(
            (item) => item.zipcode === Number(user?.address.zipcode)
          )?.county
        }
        detail={user.address.detail}
        zipcodeRef={zipcodeRef}
      />
      <SaveOrCancelBtn
        submitBtnRef={submitBtnRef}
        setRestData={setRestUserData}
      />
    </form>
  );
}
