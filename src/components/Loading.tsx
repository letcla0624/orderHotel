import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <ThreeDots
        visible={true}
        height="60"
        width="60"
        color="#BF9D7D"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
