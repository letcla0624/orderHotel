// import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";

// 自定義
import AutoScrollTop from "@/components/AutoScrollTop.tsx";
import "@/assets/style/main.scss";

// 全局引入
import "flowbite";
import "react-material-symbols/rounded";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HashRouter>
    <AutoScrollTop>
      <App />
    </AutoScrollTop>
  </HashRouter>
  // </React.StrictMode>
);
