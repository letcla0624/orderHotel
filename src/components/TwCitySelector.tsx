import { useEffect } from "react";
// components
import Input from "@/components/form/Input";
// 台灣縣市地址
import TwCitySelector from "tw-city-selector";

export default function TWCitySelector({
  register,
  errors,
  labelColor,
  county,
  district,
  detail,
  zipcodeRef,
}) {
  useEffect(() => {
    new TwCitySelector({
      el: ".city-selector-set",
      standardWords: true,
      elCounty: ".county",
      elDistrict: ".district",
      elZipcode: ".zipcode",
      hasZipcode: true,
      hiddenZipcode: true,
    });
  }, [county]);

  return (
    <template className="block w-full mb-2">
      <label className={`block mb-2 ${labelColor}`}>地址</label>
      <div className="city-selector-set flex justify-between gap-3 mb-3">
        <select
          id="county"
          data-value={county}
          className="county w-full rounded-lg px-3 py-4 border-black-40 placeholder-black-100/20 focus:border-primary-100 focus:ring focus:ring-primary-100 focus:outline-none"
        ></select>
        <select
          id="district"
          data-value={district}
          className="district w-full rounded-lg px-3 py-4 border-black-40 placeholder-black-100/20 focus:border-primary-100 focus:ring focus:ring-primary-100 focus:outline-none"
        ></select>
        <input
          className="zipcode rounded-lg hidden"
          id="zipcode"
          ref={zipcodeRef}
          type="text"
          size={3}
          readOnly
          placeholder="郵遞區號"
        />
      </div>
      <Input
        register={register}
        errors={errors}
        type="text"
        id="detail"
        labelText=""
        labelColor=""
        placeholder="路巷弄號"
        defaultValue={detail}
        autoFocus={false}
        rules={{
          required: {
            value: true,
            message: "請填寫詳細地址！",
          },
          pattern: {
            value: /^\S(?:.*\S)?$/,
            message: "欄位前後不能有空格！",
          },
        }}
      />
    </template>
  );
}
