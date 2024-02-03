import { useEffect } from "react";
// datepicker
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/style/reactDatePicker.scss";
import "@/assets/style/reackDateRange.scss";
import tw from "date-fns/locale/zh-TW";
import useRWD from "@/utils/useRWD";
registerLocale("el", tw);

export default function DateRange({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const device = useRWD();

  // 判斷日期是否被觸發
  const navElement: HTMLElement | null = document.querySelector("nav");
  const handleCalendarToggle = (nextState: boolean) => {
    if (nextState) {
      document.body.classList.add("overflow-hidden");
      if (navElement) {
        navElement.classList.remove("z-50");
      }
    } else {
      document.body.classList.remove("overflow-hidden");
      if (navElement) {
        navElement.classList.add("z-50");
      }
    }
  };

  // 日期
  useEffect(() => {
    setEndDate(new Date(new Date(startDate).setDate(startDate?.getDate() + 1)));
  }, [setEndDate, startDate]);

  // 設定預設日期
  localStorage.setItem("startDate", startDate);
  localStorage.setItem("endDate", endDate);

  return (
    <div className="flex items-center gap-2 my-10">
      <div className="w-1/2 border border-black-100 rounded-lg p-4">
        <p className="text-xs text-black-80">入住</p>
        <ReactDatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          name="startDate"
          dateFormat="yyyy / MM / dd"
          locale={tw}
          placeholderText="起始日期"
          monthsShown={device === "PC" ? 2 : 1}
          popperPlacement="bottom-end"
          className="w-full p-0 border-none bg-transparent focus:ring-0 hover:cursor-pointer"
          withPortal
          onFocus={() => handleCalendarToggle(true)}
          onBlur={() => handleCalendarToggle(false)}
        />
      </div>
      <div className="w-1/2 border border-black-100 rounded-lg p-4">
        <p className="text-xs text-black-80">退房</p>
        <ReactDatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          name="endDate"
          dateFormat="yyyy / MM / dd"
          locale={tw}
          placeholderText="結束日期"
          monthsShown={device === "PC" ? 2 : 1}
          popperPlacement="bottom-end"
          className="w-full p-0 border-none bg-transparent focus:ring-0 hover:cursor-pointer"
          withPortal
          onFocus={() => handleCalendarToggle(true)}
          onBlur={() => handleCalendarToggle(false)}
        />
      </div>
    </div>
  );
}
