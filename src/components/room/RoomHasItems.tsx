// icon
import { Info } from "@/interface/admin";
import { MaterialSymbol } from "react-material-symbols";

// data
// import roomList from "@/api/roomList.json";

export default function RoomHas({ title, hasItems, margin }) {
  return (
    <div className={margin}>
      <h3 className="text-base lg:text-h5 font-bold tracking-wider px-3 lg:px-5 relative after:absolute after:border-l-4 after:h-full after:border-primary-100 after:rounded after:left-0 after:top-0">
        {title}
      </h3>
      <div className="flex bg-white rounded-lg p-5 mt-5">
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-2`}
        >
          {hasItems &&
            hasItems.map((item: Info) => {
              return (
                <div
                  className="flex justify-start items-center min-w-[96px]"
                  key={item.title}
                >
                  <MaterialSymbol
                    icon="check"
                    size={24}
                    fill
                    grade={0}
                    className="text-primary-100 mr-2"
                  />
                  <p className="text-sm lg:text-base font-semibold">
                    {item.title}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
