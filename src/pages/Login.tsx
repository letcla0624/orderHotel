import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
// components
import Input from "@/components/form/Input";
// interface
import { UserLogin } from "@/interface/form";
// sweetAlert
import { sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
// api data
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { login, checkout, verifyEmail, generateEmailCode } from "@/api/users";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLogin>({
    mode: "onTouched",
    defaultValues: {
      email: Cookies.get("email"),
      checkRemember: Cookies.get("checkRemember") as unknown as boolean,
    },
  });

  // 登入
  const onSubmit: SubmitHandler<UserLogin> = async (loginData) => {
    try {
      // 從回傳的資料取得 token，使用 js-cookie 設定 token 名稱為 orderHotelToken，並儲存到 cookie 上，到期日為 7 天
      const { data } = await login(loginData);
      const { token } = data;
      Cookies.set("orderHotelToken", token, { expires: 7 });

      // 記住帳號 (因為流程會清除 localeStorage 的全部資訊，所以帳號資訊存放在 cookie 裡 )
      if (loginData.checkRemember) {
        Cookies.set("email", data.result.email);
        Cookies.set("checkRemember", "true");
      } else {
        Cookies.remove("email");
        Cookies.remove("checkRemember");
      }

      // 驗證登入
      await checkout();
      await sweetAlert("success", "登入成功", "自動跳轉到首頁...");

      // 1秒後跳轉到首頁
      const timeOut = setTimeout(() => {
        navigate("/");
        clearTimeout(timeOut);
      }, 1000);
    } catch (error: unknown) {
      await sweetAlertError(error as AxiosError, "登入失敗");
    }
  };

  // 欄位有值送出按鈕才會開啟
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const watchForm = useWatch({ control });
  useEffect(() => {
    watchForm.email?.trim().length && watchForm.password?.trim().length
      ? submitBtnRef.current?.removeAttribute("disabled")
      : submitBtnRef.current?.setAttribute("disabled", "disabled");
  }, [watchForm]);

  // 忘記密碼
  const forgotPwdFn = async () => {
    await Swal.fire({
      title: "忘記密碼",
      input: "email",
      inputLabel: "請輸入您註冊的電子信箱",
      inputPlaceholder: "hello@example.com",
      color: "#fff",
      background: "#140f0a",
      showCancelButton: true,
      confirmButtonText: "驗證",
      cancelButtonText: "取消",
      reverseButtons: true,
      customClass: {
        popup: `border border-red-600 rounded-2xl`,
        confirmButton: `shadow-none bg-primary-100 px-6 py-3 rounded-lg font-semibold hover:bg-primary-120 focus:outline-none text-white`,
        cancelButton: `shadow-none px-6 py-3 rounded-lg font-semibold hover:text-primary-100`,
        input: `text-black-100 rounded-lg border placeholder-black-100/20 border-black-40 focus:border-primary-100 focus:ring focus:ring-primary-100 focus:outline-none swalInput`,
        loader: `w-6 h-6 border-2 border-y-primary-100`,
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {
        try {
          if (email) {
            try {
              const { data } = await verifyEmail(email);

              if (data.result.isEmailExists) {
                await generateEmailCode(email);
                await sweetAlert(
                  "success",
                  "驗證成功",
                  "已寄送驗證碼至您的 Email",
                  500000
                );
                navigate("/forgotpwd");
              } else {
                sweetAlert("error", "驗證失敗", "此 Email 尚未註冊過");
              }
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
    });
  };

  return (
    <>
      <h1 className="text-h3 lg:text-h1 font-bold text-white mt-2 mb-5">
        立即開始旅程
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
        <div className="flex justify-between items-center mb-5">
          <div>
            <input
              type="checkbox"
              id="checkRemember"
              className="w-4 h-4 border focus:border-primary-100 rounded-sm focus:ring-4 focus:ring-offset-0 focus:ring-primary-100/50"
              {...register("checkRemember")}
            />
            <label htmlFor="checkRemember" className="ms-2 text-gray-300">
              記住帳號
            </label>
          </div>
          <button
            type="button"
            className="text-primary-100 underline"
            onClick={forgotPwdFn}
          >
            忘記密碼
          </button>
        </div>
        <button
          type="submit"
          ref={submitBtnRef}
          className="w-full text-white bg-primary-100 focus:ring-0 focus:outline-none font-medium rounded-lg p-4 text-center disabled:text-black-60 disabled:bg-white my-10 hover:bg-primary-120 transition duration-300"
        >
          會員登入
        </button>
      </form>
      <p className="text-white">
        沒有會員嗎？{" "}
        <Link to="/register" className="text-primary-100 underline">
          前往註冊
        </Link>
      </p>
    </>
  );
}
