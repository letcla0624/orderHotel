import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  // 產品模式時要改為專案名稱
  base: process.env.NODE_ENV === "production" ? "/orderHotel/" : "/",
  plugins: [react()],
  // 使用別名 @ 代替 src
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
