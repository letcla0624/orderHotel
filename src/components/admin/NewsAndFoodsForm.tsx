import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
// components
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
// interface
import { NewsAndFoodsList } from "@/interface/admin";
// utils
import { sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
// api data
import { AxiosError } from "axios";
import { createNews, createFood, updateNews, updateFood } from "@/api/admin";

// props 的介面
interface NewsAndFoodsFormProps {
  text: string;
  editData: NewsAndFoodsList | null;
  closeModalFn: () => void;
  setFetchData: (value: boolean) => void;
}

export default function NewsAndFoodsForm({
  text,
  editData,
  closeModalFn,
  setFetchData,
}: NewsAndFoodsFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<NewsAndFoodsList>({});

  // 如果是編輯有資料則帶入
  useEffect(() => {
    setValue("title", editData?.title || "");
    setValue("description", editData?.description || "");
    setValue("image", editData?.image || "");
    setValue("smallImage", editData?.smallImage || "");
  }, [setValue, editData]);

  // 取得網址路徑
  const { pathname } = useLocation();
  const onSubmit: SubmitHandler<NewsAndFoodsList> = async (data) => {
    try {
      if (pathname === "/admin/news") {
        if (editData?._id) {
          await updateNews(editData._id, data);
          await sweetAlert("success", "更新成功");
          setFetchData(true);
        } else {
          await createNews(data);
          await sweetAlert("success", "新增成功");
          setFetchData(true);
        }
      } else if (pathname === "/admin/foods") {
        {
          if (editData?._id) {
            await updateFood(editData._id, data);
            await sweetAlert("success", "更新成功");
            setFetchData(true);
          } else {
            await createFood(data);
            await sweetAlert("success", "新增成功");
            setFetchData(true);
          }
        }
      }

      // 關閉 Modal
      closeModalFn();
      // 清空資料
      reset();
    } catch (error) {
      await sweetAlertError(
        error as AxiosError,
        `${editData?._id ? "編輯" : "新增"}失敗`
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          register={register}
          errors={errors}
          type="text"
          id="title"
          labelText="標題"
          labelColor="text-black-100"
          placeholder="請輸入標題"
          defaultValue=""
          autoFocus={true}
          rules={{
            required: {
              value: true,
              message: "標題為必填！",
            },
          }}
        />
        <Textarea
          register={register}
          errors={errors}
          id="description"
          labelText="內文"
          labelColor="text-primary-100"
          placeholder="請輸入內文"
          rules={{
            required: {
              value: true,
              message: "內文為必填！",
            },
          }}
        />
        <Input
          register={register}
          errors={errors}
          type="text"
          id="image"
          labelText="桌機圖片網址"
          labelColor="text-black-100"
          placeholder="請輸入桌機圖片網址 https://xxx.xxx/xxx"
          defaultValue=""
          autoFocus={false}
          rules={{
            required: {
              value: true,
              message: "桌機圖片網址為必填！",
            },
          }}
        />
        <Input
          register={register}
          errors={errors}
          type="text"
          id="smallImage"
          labelText="手機圖片網址"
          labelColor="text-black-100"
          placeholder="請輸入手機圖片網址 https://xxx.xxx/xxx"
          defaultValue=""
          autoFocus={false}
          rules={{
            required: {
              value: true,
              message: "手機圖片網址為必填！",
            },
          }}
        />
        {pathname === "/admin/foods" && (
          <Input
            register={register}
            errors={errors}
            type="text"
            id="diningTime"
            labelText="供應時間"
            labelColor="text-black-100"
            placeholder="請輸入供應時間 SUN-MON 11:00-20:30"
            defaultValue="SUN-MON 11:00-20:30"
            autoFocus={false}
            rules={{
              required: {
                value: true,
                message: "供應時間為必填！",
              },
            }}
          />
        )}
        <button
          type="submit"
          className="w-full text-white bg-primary-100 focus:ring-0 focus:outline-none font-medium rounded-lg p-4 text-center disabled:text-black-60 disabled:bg-white my-5 hover:bg-primary-120 transition duration-300"
        >
          確定{editData?._id ? "編輯" : "新增"}
          {text}
        </button>
      </form>
    </>
  );
}
