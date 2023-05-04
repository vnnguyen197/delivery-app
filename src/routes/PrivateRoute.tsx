import useToken from "hooks/useToken";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "layouts";
import { LayoutType } from "layouts";

const PrivateRoute = ({ layout }: { layout: LayoutType }) => {
  const { token } = useToken();
  const LayoutTemplate = Layout(layout);

  if (token) {
    return (
      <LayoutTemplate>
        <Outlet />
      </LayoutTemplate>
    );
  } else
    return (
      <>
        <Navigate to="/login" replace={true} />
      </>
    );
};
export default PrivateRoute;
