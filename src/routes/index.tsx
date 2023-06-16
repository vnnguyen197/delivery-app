import { Routes, Route } from "react-router-dom";
import DefaultRoute from "./DefaultRoute";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import { LayoutType } from "layouts";
import Login from "pages/auth/components/Login";
import Register from "pages/auth/components/Register";
import Profile from "pages/profile";
import Order from "pages/order";
import StatusOrder from "pages/statusOrder";
import useToken from "hooks/useToken";
import { useAuthValue } from "hooks/useAuthContext";
import { ForgotPass } from "pages/auth/components/ForgotPass";
import { SendOTP } from "pages/auth/components/ForgotPass/SendOTP";
import { ResetPass } from "pages/auth/components/ForgotPass/ResetPass";

export default function Routers() {
  const { setToken } = useToken();
  const { profile } = useAuthValue();

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute layout={LayoutType?.basic} />}>
        <Route path="/profile" element={<Profile />} />
        {profile?.role === "user" ? (
          <Route path="/order" element={<Order />} />
        ) : null}
        <Route path="/" element={<StatusOrder />} />
      </Route>
      <Route path="/" element={<DefaultRoute layout={LayoutType.blank} />}>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/send-otp" element={<SendOTP />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Route>
    </Routes>
  );
}
