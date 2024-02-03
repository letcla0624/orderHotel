// react
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AutoScrollTop({ children }) {
  const { pathname } = useLocation();

  // 頁面切換回到最頂部
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
