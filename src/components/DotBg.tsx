// utils
import useRWD from "@/utils/useRWD";

export default function DotBg({ mainClass }) {
  const device = useRWD();

  return (
    <img
      src={device === "PC" ? "img/pc/dot.png" : "img/mobile/dot.png"}
      alt="dotBg"
      className={`absolute w-28 lg:w-48 z-[1] ${mainClass}`}
    />
  );
}
