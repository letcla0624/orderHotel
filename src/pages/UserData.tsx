// react
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
// components
import ResetPasswordForm from "@/components/account/ResetPasswordForm";
import ResetUserDataForm from "@/components/account/ResetUserDataForm";
// utils
import ZipCodeMap from "@/utils/zipcodes";
// 用於日期格式轉換
import { format } from "date-fns";

import { UserContextValue } from "@/interface/form";

export default function OrderFinished() {
  // 從父層 Account.tsx 取得共用資料的 props
  const outletContextValue = useOutletContext<UserContextValue>();

  const [user, setUser] = useState<UserContextValue["user"] | null>(null);
  useEffect(() => {
    if (outletContextValue.user.name) {
      setUser(outletContextValue.user);
    }
  }, [outletContextValue]);

  // 重設密碼
  const [resetPassword, setRestPassword] = useState(false);
  const resetPasswordBtn = () => {
    setRestPassword(true);
  };

  // 編輯個人資料
  const [resetUserData, setRestUserData] = useState(false);
  const resetUserDataBtn = () => {
    setRestUserData(true);
  };

  return (
    <>
      <div className="w-full lg:w-2/5">
        <div className="bg-white rounded-3xl p-5 xl:p-10">
          <div>
            <h2 className="text-h6 lg:text-h5 font-bold mb-5 lg:mb-10 tracking-wider">
              修改密碼
            </h2>
            <ul className="text-sm lg:text-base">
              <li className="mb-5">
                <h3 className="text-black-60 font-semibold mb-2">電子信箱</h3>
                <p className="font-bold">{user?.email}</p>
              </li>
              <li className="">
                {resetPassword ? (
                  <ResetPasswordForm
                    setRestPassword={setRestPassword}
                    user={user}
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-black-60 font-semibold mb-2">密碼</h3>
                      <p className="font-bold text-h1 leading-5 tracking-wide">
                        ·········
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-primary-100 hover:text-primary-120 font-semibold underline"
                      onClick={resetPasswordBtn}
                    >
                      重設
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/5">
        <div className="bg-white rounded-3xl p-5 xl:p-10">
          <div>
            <h2 className="text-h6 lg:text-h5 font-bold mb-5 lg:mb-10 tracking-wider">
              基本資料
            </h2>
            {resetUserData ? (
              <ResetUserDataForm
                setRestUserData={setRestUserData}
                updateUserDataFn={outletContextValue.updateUserDataFn}
                user={user}
              />
            ) : (
              <>
                <ul className="mb-8 lg:mb-10 text-sm lg:text-base">
                  <li className="mb-5">
                    <h3 className="text-black-60 font-semibold mb-2">姓名</h3>
                    <p className="font-bold">{user?.name}</p>
                  </li>
                  <li className="mb-5">
                    <h3 className="text-black-60 font-semibold mb-2">
                      手機號碼
                    </h3>
                    <p className="font-bold">{user?.phone}</p>
                  </li>
                  <li className="mb-5">
                    <h3 className="text-black-60 font-semibold mb-2">生日</h3>
                    <p className="font-bold">
                      {user?.birthday !== undefined &&
                        format(new Date(user?.birthday), "yyyy 年 MM 月 dd 日")}
                    </p>
                  </li>
                  <li className="mb-5">
                    <h3 className="text-black-60 font-semibold mb-2">地址</h3>
                    <p className="font-bold">
                      {user?.address !== undefined &&
                        `${
                          ZipCodeMap.find(
                            (item) =>
                              item.zipcode === Number(user?.address.zipcode)
                          )?.city
                        }${
                          ZipCodeMap.find(
                            (item) =>
                              item.zipcode === Number(user?.address.zipcode)
                          )?.county
                        }${user?.address.detail}`}
                    </p>
                  </li>
                </ul>
                <button
                  type="button"
                  className="text-primary-100 border border-primary-100 px-8 py-4 rounded-lg hover:bg-primary-100 hover:text-white transition duration-300"
                  onClick={resetUserDataBtn}
                >
                  編輯
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
