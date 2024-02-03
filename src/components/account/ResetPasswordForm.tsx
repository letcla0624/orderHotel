import { useEffect, useRef } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
// components
import Input from "@/components/form/Input";
import SaveOrCancelBtn from "./SaveOrCancelBtn";
// interface
import { UpdateUserData } from "@/interface/form";
// sweetAlert
import { sweetAlert, confirmAlert, sweetAlertError } from "@/utils/sweetAlert";
// api data
import { AxiosError } from "axios";
import { updateUser } from "@/api/users";

export default function ResetPasswordForm({ setRestPassword, user }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<UpdateUserData>({
    mode: "onTouched",
  });

  // 更新
  const onSubmit: SubmitHandler<UpdateUserData> = async (resetUserData) => {
    // 設定更新資料
    const updateUserData: UpdateUserData = {
      ...user,
      userId: user._id,
      oldPassword: resetUserData.oldPassword,
      newPassword: resetUserData.newPassword,
    };

    try {
      const result = await confirmAlert("warning", "確定修改密碼？");
      if (result.isConfirmed) {
        await updateUser(updateUserData);
        await sweetAlert("success", "密碼更新成功");
        setRestPassword(false);
      }
    } catch (error: unknown) {
      await sweetAlertError(error as AxiosError, "密碼更新失敗");
    }
  };

  // 欄位有值送出按鈕才會開啟
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const watchForm = useWatch({ control });
  useEffect(() => {
    watchForm.oldPassword?.length &&
    watchForm.newPassword?.length &&
    watchForm.newPasswordAgain?.length
      ? submitBtnRef.current?.removeAttribute("disabled")
      : submitBtnRef.current?.setAttribute("disabled", "disabled");
  }, [watchForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        register={register}
        errors={errors}
        type="password"
        id="oldPassword"
        labelText="舊密碼"
        labelColor="text-black-100"
        placeholder="請輸入舊密碼"
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
        id="newPassword"
        labelText="新密碼"
        labelColor="text-black-100"
        placeholder="請輸入新密碼"
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
        id="newPasswordAgain"
        labelText="確認新密碼"
        labelColor="text-black-100"
        placeholder="請再一次輸入新密碼"
        defaultValue=""
        autoFocus={false}
        rules={{
          required: {
            value: true,
            message: "密碼為必填！",
          },
          validate: {
            message: (value: string) =>
              value === watch("newPassword") || "密碼不一致",
          },
        }}
      />
      <SaveOrCancelBtn
        submitBtnRef={submitBtnRef}
        setRestData={setRestPassword}
      />
    </form>
  );
}
