// utils
import useRWD from "@/utils/useRWD";

export default function FooterLineBg() {
  const device = useRWD();

  return (
    <img
      src={device === "PC" ? "img/pc/line2.png" : "img/mobile/line.png"}
      alt="lineBg"
      className="w-full"
    />
  );
}
