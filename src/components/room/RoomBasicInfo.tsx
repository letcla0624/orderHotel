import { MaterialSymbol } from "react-material-symbols";

export default function RoomBasicInfo({ room, padding, border }) {
  return (
    <ul className={`flex gap-4 ${padding}`}>
      <li
        className={`flex items-center bg-white w-24 h-24 pl-4 rounded-lg ${border}`}
      >
        <div>
          <MaterialSymbol
            icon="aspect_ratio"
            size={24}
            fill
            className="text-primary-100"
          />
          <p className="font-bold text-black-80">{room.areaInfo} 坪</p>
        </div>
      </li>
      <li
        className={`flex items-center bg-white w-24 h-24 pl-4 rounded-lg ${border}`}
      >
        <div>
          <MaterialSymbol
            icon="king_bed"
            size={24}
            fill
            className="text-primary-100"
          />
          <p className="font-bold text-black-80">{room.bedInfo} 張大床</p>
        </div>
      </li>
      <li
        className={`flex items-center bg-white w-24 h-24 pl-4 rounded-lg ${border}`}
      >
        <div>
          <MaterialSymbol
            icon="person"
            size={24}
            fill
            className="text-primary-100"
          />
          <p className="font-bold text-black-80">2-{room.maxPeople} 人</p>
        </div>
      </li>
    </ul>
  );
}
