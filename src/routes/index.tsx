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

export default function Routers() {
  const { setToken } = useToken();

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute layout={LayoutType?.basic} />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/order" element={<Order />} />
        <Route path="/" element={<StatusOrder />} />
      </Route>
      <Route path="/" element={<DefaultRoute layout={LayoutType.blank} />}>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
