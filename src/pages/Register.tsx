// react
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, useWatch, Controller } from "react-hook-form";
// components
import Input from "@/components/form/Input";
import TwCitySelector from "@/components/TwCitySelector";
// interface
import { UserRegister } from "@/interface/form";
// icon
import { MaterialSymbol } from "react-material-symbols";
// sweetAlert
import { sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
// datepicker
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/style/reactDatePicker.scss";
import tw from "date-fns/locale/zh-TW";
registerLocale("el", tw);
// api data
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { signup } from "@/api/users";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<UserRegister>({
    mode: "onTouched",
  });

  const zipcodeRef = useRef<HTMLSelectElement | null>(null);
  // 表單送出
  const onSubmit: SubmitHandler<UserRegister> = async (registerData) => {
    const formData: UserRegister = {
      ...registerData,
      address: {
        detail: registerData.detail,
        zipcode: Number(zipcodeRef.current?.value),
      },
    };

    try {
      const { data } = await signup(formData);
      // 從回傳的資料取得 token
      const { token } = data;
      // 使用 js-cookie 設定 token 名稱為 orderHotelToken，並儲存到 cookie 上，到期日為 7 天
      Cookies.set("orderHotelToken", token, { expires: 7 });

      // 1秒後跳轉到首頁
      await sweetAlert("success", "註冊成功", "自動跳轉到首頁...");
      const timeOut = setTimeout(() => {
        navigate("/");
        clearTimeout(timeOut);
      }, 1000);
    } catch (error: unknown) {
      await sweetAlertError(error as AxiosError, "註冊失敗");
      setNextStep(false);
    }
  };

  // 欄位有值按鈕才會開啟
  const nextStepBtnRef = useRef<HTMLButtonElement>(null);
  const watchForm = useWatch({ control });
  useEffect(() => {
    watchForm.email?.trim().length &&
    watchForm.password?.trim().length &&
    watchForm.passwordAgain?.trim().length
      ? nextStepBtnRef.current?.removeAttribute("disabled")
      : nextStepBtnRef.current?.setAttribute("disabled", "disabled");
  }, [watchForm]);

  // 下一步
  const [nextStep, setNextStep] = useState(false);
  const nextStepFn = () => {
    setNextStep(true);
  };

  // 下一步 Enter 鍵
  const handleKeyUpNext = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      nextStepFn();
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUpNext);
    return () => {
      document.removeEventListener("keyup", handleKeyUpNext);
    };
  }, [handleKeyUpNext]);

  return (
    <>
      <h1 className="text-h3 lg:text-h1 font-bold text-white mt-2 mb-5">
        立即註冊
      </h1>
      {/* 步驟顯示 */}
      <ol className="items-center w-full flex justify-between space-x-2  my-10">
        <li className="flex flex-col justify-center items-center text-white">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full mb-2">
            {nextStep ? <MaterialSymbol icon="check" size={24} /> : 1}
          </div>
          <p className="text-sm lg:text-base tracking-wider whitespace-nowrap">
            輸入信箱及密碼
          </p>
        </li>
        <li className="w-full max-w-[170px]">
          <hr className="w-full border-black-60" />
        </li>
        <li
          className={`flex flex-col justify-center items-center ${
            nextStep ? "text-white" : "text-black-60"
          }`}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
              nextStep ? "bg-primary-100" : "border border-black-60"
            }`}
          >
            2
          </div>
          <p className="text-sm lg:text-base tracking-wider whitespace-nowrap">
            填寫基本資料
          </p>
        </li>
      </ol>
      {/* 表單 */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {nextStep || (
          <>
            <Input
              register={register}
              errors={errors}
              type="email"
              id="email"
              labelText="電子信箱"
              labelColor="text-white"
              placeholder="hello@example.com"
              defaultValue=""
              autoFocus={true}
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
            <Input
              register={register}
              errors={errors}
              type="password"
              id="password"
              labelText="密碼"
              labelColor="text-white"
              placeholder="請輸入密碼"
              defaultValue=""
              autoFocus={false}
              rules={{
                required: {
                  value: true,
                  message: "密碼為必填！",
                },
                minLength: {
                  value: 8,
                  message: "密碼最少為 8 碼！",
                },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*\s).+$/,
                  message: "密碼須為英數混合且不能有空格！",
                },
              }}
            />
            <Input
              register={register}
              errors={errors}
              type="password"
              id="passwordAgain"
              labelText="確認密碼"
              labelColor="text-white"
              placeholder="請再輸入一次密碼"
              defaultValue=""
              autoFocus={false}
              rules={{
                required: {
                  value: true,
                  message: "密碼為必填！",
                },
                validate: {
                  message: (value: string) =>
                    value === watch("password") || "密碼不一致",
                },
              }}
            />
            <button
              type="button"
              ref={nextStepBtnRef}
              className="w-full text-white bg-primary-100 focus:ring-0 focus:outline-none font-medium rounded-lg p-4 text-center disabled:text-black-60 disabled:bg-white my-10 hover:bg-primary-120 transition duration-300"
              onClick={handleSubmit(nextStepFn)}
              onKeyUp={() => handleKeyUpNext}
            >
              下一步
            </button>
          </>
        )}
        {nextStep && (
          <>
            <Input
              register={register}
              errors={errors}
              type="text"
              id="name"
              labelText="姓名"
              labelColor="text-black-100"
              placeholder="請輸入姓名"
              defaultValue=""
              autoFocus={true}
              rules={{
                required: {
                  value: true,
                  message: "姓名為必填！",
                },
                pattern: {
                  value: /^\S(?:.*\S)?$/,
                  message: "欄位前後不能有空格！",
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
                  value: /(^09\d{8})$/,
                  message: "手機號碼格式錯誤，應為 09XXXXXXXX！",
                },
              }}
            />
            <template className="block w-full mb-5">
              <label
                className={`block text-sm lg:text-base mb-2 ${
                  errors.birthday ? "text-red-500" : "text-white"
                }`}
              >
                生日
              </label>
              <Controller
                control={control}
                name="birthday"
                rules={{
                  required: {
                    value: true,
                    message: "生日為必填！",
                  },
                }}
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
                      selected={value as unknown as Date}
                      locale={tw}
                      dateFormat="yyyy/MM/dd"
                      isClearable
                    />
                  );
                }}
              />
              {errors.birthday && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.birthday?.message}
                </p>
              )}
            </template>
            <TwCitySelector
              register={register}
              errors={errors}
              labelColor="text-white"
              county={"臺北市"}
              district={"中正區"}
              detail=""
              zipcodeRef={zipcodeRef}
            />
            <div className="mb-5">
              <input
                type="checkbox"
                id="checkTerms"
                className="w-4 h-4 border focus:border-primary-100 rounded-sm focus:ring-4 focus:ring-offset-0 focus:ring-primary-100/50"
                {...register("checkTerms", {
                  required: {
                    value: true,
                    message: "必須勾選使用規範！",
                  },
                })}
              />
              <label htmlFor="checkTerms" className="ms-2 text-gray-300">
                我已閱讀並同意本網站個資使用規範
              </label>
              {errors.checkTerms && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.checkTerms?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-100 focus:ring-0 focus:outline-none font-medium rounded-lg p-4 text-center disabled:text-black-60 disabled:bg-white my-5 hover:bg-primary-120 transition duration-300"
            >
              完成註冊
            </button>
          </>
        )}
      </form>
      <p className="text-white text-sm lg:text-base">
        已經有會員了嗎？{" "}
        <Link to="/login" className="text-primary-100 underline">
          立即登入
        </Link>
      </p>
    </>
  );
}
