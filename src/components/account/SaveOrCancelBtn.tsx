export default function SaveOrCancelBtn({ submitBtnRef, setRestData }) {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:mt-10">
      <button
        type="submit"
        ref={submitBtnRef}
        className="w-full lg:w-fit text-white bg-primary-100 focus:ring-0 focus:outline-none font-medium rounded-lg px-7 py-4 text-center disabled:text-black-60 disabled:bg-black-40  hover:bg-primary-120 transition duration-300"
      >
        儲存設定
      </button>
      <button
        type="button"
        className="text-black-60 px-7 py-4 hover:text-primary-100"
        onClick={() => setRestData(false)}
      >
        取消
      </button>
    </div>
  );
}
