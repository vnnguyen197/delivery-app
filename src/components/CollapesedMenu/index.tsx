import React from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
  TableOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "contexts/LoadingContext";
import useToken from "hooks/useToken";
import { useAuthValue } from "hooks/useAuthContext";

const CollapesedMenu: React.FC = () => {
  const navigate = useNavigate();
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const { remove } = useToken();
  const { profile, clearProfile } = useAuthValue();

  const logout = async () => {
    setLoadingTrue();
    const timer = setTimeout(() => {
      setLoadingFalse();
      remove();
      clearProfile();
      navigate("/login");
    }, 200);
    return () => clearTimeout(timer);
  };

  const menuItems: any = [
    {
      key: "1",
      label: "Quản lý thông tin cá nhân",
      path: "/profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Tạo đơn hàng",
      path: "/order",
      icon: <DesktopOutlined />,
    },
    {
      key: "3",
      label: "Theo dõi đơn hàng",
      path: "/",
      icon: <ContainerOutlined />,
    },
    {
      key: "5",
      label: "Bảng giá đơn hàng",
      path: "/price-list",
      icon: <TableOutlined /> ,
    },
    { key: "4", label: "Đăng xuất", icon: <LogoutOutlined /> },
  ];

  const menuItemsShipper: any = [
    {
      key: "1",
      label: "Quản lý thông tin cá nhân",
      path: "/profile",
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: "Theo dõi đơn hàng",
      path: "/",
      icon: <ContainerOutlined />,
    },
    {
      key: "4",
      label: "Bảng giá đơn hàng",
      path: "/price-list",
      icon: <TableOutlined /> ,
    },
    { key: "2", label: "Đăng xuất", icon: <LogoutOutlined /> },
  ];

  return (
    <Menu defaultSelectedKeys={["3"]} defaultOpenKeys={["sub1"]} mode="inline">
      {profile?.role === "user"
        ? menuItems?.map((item: any) => (
            <Menu.Item
              key={item?.key}
              icon={item?.icon}
              onClick={item?.key === "4" ? logout : () => null}
              style={{
                color: item?.key === "4" ? "red" : (null as any),
              }}
            >
              <Link to={item?.path}>{item?.label}</Link>
            </Menu.Item>
          ))
        : menuItemsShipper?.map((item: any) => (
            <Menu.Item
              key={item?.key}
              icon={item?.icon}
              onClick={item?.key === "2" ? logout : () => null}
              style={{ color: item?.key === "2" ? "red" : (null as any) }}
            >
              <Link to={item?.path}>{item?.label}</Link>
            </Menu.Item>
          ))}
    </Menu>
  );
};

export default CollapesedMenu;
