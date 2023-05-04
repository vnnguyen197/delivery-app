import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../layouts/index";
import { LayoutType } from "layouts";

const DefaultRoute = ({ layout }: { layout: LayoutType }) => {
  const LayoutTemplate = Layout(layout);
  return (
    <LayoutTemplate>
      <Outlet />
    </LayoutTemplate>
  );
};
export default DefaultRoute;
