import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// components
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
// utils
import { sweetAlert, sweetAlertError } from "@/utils/sweetAlert";
// interface
import { Info, RoomsList } from "@/interface/admin";
// api
import { AxiosError } from "axios";
import { createRoom, updateRoom } from "@/api/admin";

// props 的介面
interface RoomFormProps {
  text: string;
  editData: RoomsList | null;
  closeModalFn: () => void;
  setFetchData: (value: boolean) => void;
}

export default function NewsAndFoodsForm({
  text,
  editData,
  closeModalFn,
  setFetchData,
}: RoomFormProps) {
  // 房內設備資料
  const facilityInfoArr: Info[] = [
    {
      title: "平面電視",
      isProvide: false,
    },
    {
      title: "吹風機",
      isProvide: false,
    },
    {
      title: "冰箱",
      isProvide: false,
    },
    {
      title: "熱水壺",
      isProvide: false,
    },
    {
      title: "檯燈",
      isProvide: false,
    },
    {
      title: "衣櫃",
      isProvide: false,
    },
    {
      title: "除濕機",
      isProvide: false,
    },
    {
      title: "浴缸",
      isProvide: false,
    },
    {
      title: "書桌",
      isProvide: false,
    },
    {
      title: "音響",
      isProvide: false,
    },
  ];

  // 備品提供資料
  const amenityInfoArr: Info[] = [
    {
      title: "衛生紙",
      isProvide: false,
    },
    {
      title: "拖鞋",
      isProvide: false,
    },
    {
      title: "沐浴用品",
      isProvide: false,
    },
    {
      title: "清潔用品",
      isProvide: false,
    },
    {
      title: "刮鬍刀",
      isProvide: false,
    },
    {
      title: "吊衣架",
      isProvide: false,
    },
    {
      title: "浴巾",
      isProvide: false,
    },
    {
      title: "刷牙用品",
      isProvide: false,
    },
    {
      title: "罐裝水",
      isProvide: false,
    },
    {
      title: "梳子",
      isProvide: false,
    },
  ];

  // 多張圖片 <Input /> 元件渲染 5 次
  const imageUrlList = Array.from(
    { length: 5 },
    (_, index) => `imageUrlList${index}`
  );

  const smallImageUrlList = Array.from(
    { length: 5 },
    (_, index) => `smallImageUrlList${index}`
  );

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RoomsList>({});

  // 如果是編輯有資料則帶入
  useEffect(() => {
    setValue("name", editData?.name || "");
    setValue("description", editData?.description || "");
    setValue("imageUrl", editData?.imageUrl || "");
    setValue("smallImageUrl", editData?.smallImageUrl || "");
    setValue("areaInfo", editData?.areaInfo || "");
    setValue("bedInfo", editData?.bedInfo || "");
    setValue("maxPeople", editData?.maxPeople || 0);
    setValue("price", editData?.price || 0);

    // 設定桌機初始圖片陣列的值 (這邊好難)
    if (editData?.imageUrlList) {
      editData?.imageUrlList.forEach((item, index) => {
        setValue(`imageUrlList.${index}`, item);
      });
    } else if (editData === null) {
      imageUrlList.forEach((_, index) => {
        setValue(`imageUrlList.${index}`, "");
      });
    }

    // 設定手機初始圖片陣列的值 (這邊好難)
    if (editData?.smallImageUrlList) {
      editData?.smallImageUrlList.forEach((item, index) => {
        setValue(`smallImageUrlList.${index}`, item);
      });
    } else if (editData === null) {
      smallImageUrlList.forEach((_, index) => {
        setValue(`smallImageUrlList.${index}`, "");
      });
    }

    // 設定初始房內設備有無勾選 (這邊好難)
    if (editData?.facilityInfo) {
      // 根據每個項目的 isProvide 屬性來設置 checkbox 的選中狀態
      editData?.facilityInfo.forEach((item, index) => {
        setValue(`facilityInfo.${index}.title`, item.title);
        setValue(`facilityInfo.${index}.isProvide`, item.isProvide);
      });
    } else if (editData === null) {
      facilityInfoArr.forEach((item, index) => {
        setValue(`facilityInfo.${index}.title`, item.title);
        setValue(`facilityInfo.${index}.isProvide`, item.isProvide);
      });
    }

    // 設定初始備品提供有無勾選 (這邊好難)
    if (editData?.amenityInfo) {
      editData?.amenityInfo.forEach((item, index) => {
        setValue(`amenityInfo.${index}.title`, item.title);
        setValue(`amenityInfo.${index}.isProvide`, item.isProvide);
      });
    } else if (editData === null) {
      amenityInfoArr.forEach((item, index) => {
        setValue(`amenityInfo.${index}.title`, item.title);
        setValue(`amenityInfo.${index}.isProvide`, item.isProvide);
      });
    }

    // 因為加入 facilityInfoArr、amenityInfoArr 會跑無窮迴圈
    // 所以加入下面這段讓 ESLint 不要跳警告
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, editData]);

  const onSubmit: SubmitHandler<RoomsList> = async (roomData) => {
    // 轉成房內設備所需格式
    const tranFacilityInfo =
      text === "new"
        ? facilityInfoArr.map((info) => {
            const foundItemIndex = roomData?.facilityInfo.findIndex((item) =>
              typeof item === "string" ? item === info.title : false
            );

            if (foundItemIndex !== -1) {
              // 找到對應的字串，使用對應的值
              return {
                title: info.title,
                isProvide: true,
              };
            } else {
              // 沒有找到對應的字串，預設 isProvide 為 false
              return {
                title: info.title,
                isProvide: false,
              };
            }
          })
        : roomData?.facilityInfo.map((item, index) => {
            if (typeof item === "string") {
              return {
                title: item,
                isProvide: true,
              };
            } else if (typeof item === "boolean") {
              return {
                title: facilityInfoArr[index].title,
                isProvide: false,
              };
            } else {
              return item;
            }
          });

    // 轉成備品提供所需格式
    const tranAmenityInfo =
      text === "new"
        ? amenityInfoArr.map((info) => {
            const foundItemIndex = roomData?.amenityInfo.findIndex((item) =>
              typeof item === "string" ? item === info.title : false
            );

            if (foundItemIndex !== -1) {
              return {
                title: info.title,
                isProvide: true,
              };
            } else {
              return {
                title: info.title,
                isProvide: false,
              };
            }
          })
        : roomData?.amenityInfo.map((item, index) => {
            if (typeof item === "string") {
              return {
                title: item,
                isProvide: true,
              };
            } else if (typeof item === "boolean") {
              return {
                title: amenityInfoArr[index].title,
                isProvide: false,
              };
            } else {
              return item;
            }
          });

    // 重組資料庫要的資料格式
    const resetRoomData = {
      ...roomData,
      facilityInfo: tranFacilityInfo,
      amenityInfo: tranAmenityInfo,
    };

    try {
      if (editData?._id) {
        await updateRoom(editData._id, resetRoomData);
        await sweetAlert("success", "更新成功");
        setFetchData(true);
      } else {
        await createRoom(resetRoomData);
        await sweetAlert("success", "新增成功");
        setFetchData(true);
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
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          register={register}
          errors={errors}
          type="text"
          id="name"
          labelText="房型名稱"
          labelColor="text-black-100"
          placeholder="請輸入房型名稱"
          defaultValue=""
          autoFocus={true}
          rules={{
            required: {
              value: true,
              message: "房型名稱為必填！",
            },
          }}
        />
        <Textarea
          register={register}
          errors={errors}
          id="description"
          labelText="房型介紹"
          labelColor="text-primary-100"
          placeholder="請輸入房型介紹"
          rules={{
            required: {
              value: true,
              message: "房型介紹為必填！",
            },
          }}
        />
        <Input
          register={register}
          errors={errors}
          type="text"
          id="imageUrl"
          labelText="桌機房型圖片網址"
          labelColor="text-black-100"
          placeholder="請輸入桌機房型圖片網址 https://xxx.xxx/xxx"
          defaultValue=""
          autoFocus={false}
          rules={{
            required: {
              value: true,
              message: "桌機房型圖片網址為必填！",
            },
          }}
        />
        <p>桌機房型陣列圖片網址</p>
        {/* 在表單中，使用 Controller 來監控 input，這邊搞很久 */}
        <Controller
          name="imageUrlList"
          control={control}
          defaultValue={editData?.imageUrlList || []}
          render={({ field }) => (
            <>
              {text !== "new"
                ? field.value.map((item, index) => (
                    <Input
                      key={index}
                      register={(e) =>
                        register(e, {
                          onChange: (e) => {
                            setValue(`imageUrlList.${index}`, e.target.value);
                          },
                        })
                      }
                      errors={errors}
                      type="text"
                      id={`imageUrlList.${index}`}
                      labelText=""
                      labelColor="text-black-100"
                      placeholder={`請輸入房型圖片網址 https://xxx.xxx/xxx`}
                      defaultValue={item}
                      autoFocus={false}
                      rules={{
                        required: {
                          value: true,
                          message: "房型圖片網址為必填！",
                        },
                      }}
                    />
                  ))
                : imageUrlList.map((_, index) => (
                    <Input
                      key={index}
                      register={register}
                      errors={errors}
                      type="text"
                      id={`imageUrlList.${index}`}
                      labelText=""
                      labelColor="text-black-100"
                      placeholder={`請輸入房型圖片網址 https://xxx.xxx/xxx`}
                      defaultValue=""
                      autoFocus={false}
                      rules={{
                        required: {
                          value: true,
                          message: "房型圖片網址為必填！",
                        },
                      }}
                    />
                  ))}
            </>
          )}
        />
        <Input
          register={register}
          errors={errors}
          type="text"
          id="smallImageUrl"
          labelText="手機房型圖片網址"
          labelColor="text-black-100"
          placeholder="請輸入手機房型圖片網址 https://xxx.xxx/xxx"
          defaultValue=""
          autoFocus={false}
          rules={{
            required: {
              value: true,
              message: "手機房型圖片網址為必填！",
            },
          }}
        />
        <p>手機房型陣列圖片網址</p>
        {/* 在表單中，使用 Controller 來監控 input，這邊搞很久 */}
        <Controller
          name="smallImageUrlList"
          control={control}
          defaultValue={editData?.smallImageUrlList || []}
          render={({ field }) => (
            <>
              {text !== "new"
                ? field.value?.map((item, index) => (
                    <Input
                      key={index}
                      register={(e) =>
                        register(e, {
                          onChange: (e) => {
                            setValue(
                              `smallImageUrlList.${index}`,
                              e.target.value
                            );
                          },
                        })
                      }
                      errors={errors}
                      type="text"
                      id={`smallImageUrlList.${index}`}
                      labelText=""
                      labelColor="text-black-100"
                      placeholder={`請輸入手機房型圖片網址 https://xxx.xxx/xxx`}
                      defaultValue={item}
                      autoFocus={false}
                      rules={{
                        required: {
                          value: true,
                          message: "手機房型圖片網址為必填！",
                        },
                      }}
                    />
                  ))
                : imageUrlList.map((_, index) => (
                    <Input
                      key={index}
                      register={register}
                      errors={errors}
                      type="text"
                      id={`smallImageUrlList.${index}`}
                      labelText=""
                      labelColor="text-black-100"
                      placeholder={`請輸入手機房型圖片網址 https://xxx.xxx/xxx`}
                      defaultValue=""
                      autoFocus={false}
                      rules={{
                        required: {
                          value: true,
                          message: "手機房型圖片網址為必填！",
                        },
                      }}
                    />
                  ))}
            </>
          )}
        />
        {/* 房型基本資訊 */}
        <Input
          register={register}
          errors={errors}
          type="number"
          id="areaInfo"
          labelText="坪數"
          labelColor="text-black-100"
          placeholder="請輸入坪數"
          defaultValue=""
          autoFocus={false}
          rules={{
            required: {
              value: true,
              message: "坪數為必填！",
            },
          }}
        />
        <Input
          register={register}
          errors={errors}
          type="number"
          id="bedInfo"
          labelText="床型"
          labelColor="text-black-100"
          placeholder="請輸入床型"
          defaultValue=""
          autoFocus={false}
          rules={{
            required: {
              value: true,
              message: "床型為必填！",
            },
          }}
        />
        <Input
          register={register}
          errors={errors}
          type="number"
          id="maxPeople"
          labelText="最多人數"
          labelColor="text-black-100"
          placeholder="請輸入最多人數"
          defaultValue=""
          autoFocus={false}
          rules={{
            required: {
              value: true,
              message: "最多人數為必填！",
            },
          }}
        />
        <div className="mb-5">
          <p className="text-sm lg:text-base mb-2">房內設備</p>
          {/* 這邊 checkbox 搞很久 */}
          {...facilityInfoArr.map((item, index) => {
            const isChecked = watch(`facilityInfo.${index}.isProvide`);

            return (
              <div key={item.title} className="inline-block">
                <input
                  {...register(`facilityInfo.${index}`)}
                  type="checkbox"
                  id={item.title}
                  defaultValue={item.title}
                  className="mx-2"
                  defaultChecked={isChecked}
                />
                <label htmlFor={item.title} className="cursor-pointer">
                  {item.title}
                </label>
              </div>
            );
          })}
        </div>
        <div className="mb-5">
          <p className="text-sm lg:text-base mb-2">備品提供</p>
          {/* 這邊 checkbox 搞很久 */}
          {...amenityInfoArr.map((item, index) => {
            const isChecked = watch(`amenityInfo.${index}.isProvide`);

            return (
              <div key={item.title} className="inline-block">
                <input
                  {...register(`amenityInfo.${index}`)}
                  type="checkbox"
                  id={item.title}
                  defaultValue={item.title}
                  className="mx-2"
                  defaultChecked={isChecked}
                />
                <label htmlFor={item.title} className="cursor-pointer">
                  {item.title}
                </label>
              </div>
            );
          })}
        </div>
        <Input
          register={register}
          errors={errors}
          type="number"
          id="price"
          labelText="價格"
          labelColor="text-black-100"
          placeholder="請輸入價格"
          defaultValue="0"
          autoFocus={false}
          rules={{
            required: {
              value: true,
              message: "價格為必填！",
            },
          }}
        />
        <button
          type="submit"
          className="w-full text-white bg-primary-100 focus:ring-0 focus:outline-none font-medium rounded-lg p-4 text-center disabled:text-black-60 disabled:bg-white my-5 hover:bg-primary-120 transition duration-300"
        >
          確定{editData?._id ? "編輯" : "新增"}房型
        </button>
      </form>
    </>
  );
}
