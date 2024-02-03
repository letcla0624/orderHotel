import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// components
import Input from "@/components/form/Input";
// interface
import { UserForgotPwd } from "@/interface/form";
// sweetAlert
import { sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
// api data
import { AxiosError } from "axios";
import { forgotPwd } from "@/api/users";

export default function ForgotPwd() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForgotPwd>({
    mode: "onTouched",
  });

  // 登入
  const onSubmit: SubmitHandler<UserForgotPwd> = async (data) => {
    console.log(data);
    try {
      await forgotPwd(data);
      await sweetAlert("success", "修改密碼成功", "請重新登入", 500000);
      navigate("/login");
    } catch (error: unknown) {
      await sweetAlertError(error as AxiosError, "修改密碼失敗");
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center p-3 bg-[url('/img/pc/line.png')] bg-no-repeat bg-contain bg-center">
      <div className="w-full max-w-lg bg-black-bg border border-black-80 rounded-2xl p-4 pb-0 lg:p-10 lg:pb-0">
        <Link to="/" className="mx-auto block mb-10">
          <img src="/img/logo2.png" alt="享樂酒店" className="mx-auto" />
        </Link>
        <h1 className="text-h3 font-bold text-white mt-2 mb-5 hidden">
          忘記密碼
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
          <Input
            register={register}
            errors={errors}
            type="text"
            id="code"
            labelText="驗證碼 (大小寫需一致)"
            labelColor="text-white"
            placeholder="請輸入驗證碼"
            defaultValue=""
            autoFocus={false}
            rules={{
              required: {
                value: true,
                message: "驗證碼為必填！",
              },
            }}
          />
          <Input
            register={register}
            errors={errors}
            type="password"
            id="newPassword"
            labelText="新密碼 (密碼最少為 8 碼且英數混合)"
            labelColor="text-white"
            placeholder="請輸入新密碼"
            defaultValue=""
            autoFocus={false}
            rules={{
              required: {
                value: true,
                message: "新密碼為必填！",
              },
              minLength: {
                value: 8,
                message: "新密碼最少為 8 碼！",
              },
              pattern: {
                value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*\s).+$/,
                message: "密碼須為英數混合且不能有空格！",
              },
            }}
          />
          <button
            type="submit"
            className="w-full text-white bg-primary-100 focus:ring-0 focus:outline-none font-medium rounded-lg p-4 text-center disabled:text-black-60 disabled:bg-white my-10 hover:bg-primary-120 transition duration-300"
          >
            修改密碼
          </button>
        </form>
      </div>
    </div>
  );
}
