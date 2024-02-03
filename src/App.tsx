// react
import { Routes, Route } from "react-router-dom";

// pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PageNotFound from "@/pages/PageNotFound";
import Rooms from "@/pages/Rooms";
import RoomDetail from "@/pages/RoomDetail";
import OrderRoom from "@/pages/OrderRoom";
import OrderFinished from "@/pages/OrderFinished";
import UserData from "@/pages/UserData";
import OrderData from "@/pages/OrderData";

// admin
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminNews from "@/pages/admin/AdminNews";
import AdminFoods from "@/pages/admin/AdminFoods";
import AdminRooms from "@/pages/admin/AdminRooms";
import AdminOrders from "@/pages/admin/AdminOrders";

// layout
import CommonLayout from "@/layout/CommonLayout";
import LoginOrRegisterLayout from "@/layout/LoginOrRegisterLayout";
import AccountLayout from "@/layout/AccountLayout";
import AdminLayout from "@/layout/AdminLayout";
import ForgotPwd from "./pages/ForgotPwd";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<Home />} />
        <Route path="rooms">
          <Route index element={<Rooms />} />
          <Route path=":id" element={<RoomDetail />} />
        </Route>
        <Route path="orderRoom/:id" element={<OrderRoom />} />
        <Route path="orderFinished" element={<OrderFinished />} />
        <Route path="" element={<LoginOrRegisterLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="" element={<AccountLayout />}>
          <Route path="userData" element={<UserData />} />
          <Route path="orderData" element={<OrderData />} />
        </Route>
      </Route>
      <Route path="/forgotpwd" element={<ForgotPwd />} />
      {/* 後台 */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="foods" element={<AdminFoods />} />
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
