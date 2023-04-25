import { Routes, Route } from "react-router-dom";
import DefaultRoute from "./DefaultRoute";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import { LayoutType } from "layouts";
import Login from "components/auth/components/Login";
import Register from "components/auth/components/Register";

export default function Routers() {
  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRoute layout={LayoutType?.basic} />}
      ></Route>
      <Route path="/" element={<DefaultRoute layout={LayoutType.blank} />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
