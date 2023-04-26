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

export default function Routers() {
  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRoute layout={LayoutType?.basic} />}
      ></Route>
      <Route path="/" element={<DefaultRoute layout={LayoutType.blank} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order" element={<Order />} />
        <Route path="/status-order" element={<StatusOrder />} />
      </Route>
    </Routes>
  );
}
