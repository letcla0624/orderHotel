import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import axios, { AxiosError, AxiosResponse } from "axios";

// sweetAlert 2
export const sweetAlert = (
  icon: SweetAlertIcon,
  title: string,
  text = "",
  timer = 1000
): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon,
    title,
    text,
    color: "#fff",
    background: "#140f0a",
    confirmButtonText: "確定",
    customClass: {
      popup: `border border-red-600 rounded-2xl`,
      confirmButton: `shadow-none bg-primary-100 px-6 py-3 rounded-lg font-semibold hover:bg-primary-120 focus:outline-none`,
    },
    buttonsStyling: false,
    showConfirmButton: icon === "success" && timer === 1000 ? false : true,
    timer: icon === "success" ? timer : 0,
  });
};

// sweetAlert 2 Confirm
export const confirmAlert = (
  icon: SweetAlertIcon,
  title: string
): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    icon,
    color: "#fff",
    background: "#140f0a",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    reverseButtons: true,
    customClass: {
      popup: `border border-red-600 rounded-2xl`,
      confirmButton: `shadow-none bg-primary-100 px-6 py-3 rounded-lg font-semibold hover:bg-primary-120 focus:outline-none`,
      cancelButton: `shadow-none px-6 py-3 rounded-lg font-semibold hover:text-primary-100`,
    },
    buttonsStyling: false,
  });
};

// sweetAlert 2 錯誤訊息
export async function sweetAlertError(error: AxiosError, title: string) {
  if (axios.isAxiosError(error) && error.response) {
    const responseData = (error.response as AxiosResponse)?.data;
    await sweetAlert("error", title, responseData?.message);
  } else {
    console.error(error);
  }
}
