// 要和 context/LoadingContext.tsx 搭配
// 用來取得 Loading

import { useContext } from "react";
import { LoadingContext } from "@/context/LoadingContext";

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};
