import Loading from "@/components/Loading";

export default function OrderWaiting() {
  return (
    <div className="w-screen h-screen backdrop-blur-sm bg-black-100/40 flex justify-center items-center absolute top-0 z-10">
      <div className="w-[90%] lg:w-[80%] max-w-screen-md bg-white px-5 py-10 sm:py-20 md:py-40 rounded-2xl flex flex-col justify-center items-center">
        <Loading />
        <img src="/img/logo2.png" alt="logo" className="mt-5 mb-4" />
        <p className="text-base sm:text-h5 font-bold tracking-wider">
          正在處理你的預訂
        </p>
      </div>
    </div>
  );
}
