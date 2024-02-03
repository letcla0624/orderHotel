import { useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
// import { readAllOrders } from "@/api/admin";

export default function AdminDashboard() {
  useEffect(() => {
    (async () => {
      try {
        // const { data } = await readAllOrders();
        // console.log(data.result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <MaterialSymbol
          icon="coronavirus"
          size={60}
          className="text-primary-100 mb-4"
        />
        <h1 className=" text-h5 font-bold text-black-80">
          COVID-19 確診，現正腦霧中...
        </h1>
      </div>
    </div>
  );
}
