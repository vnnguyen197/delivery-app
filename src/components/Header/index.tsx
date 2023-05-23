import React, { useRef, useState } from "react";
import {
  StyleListHeader,
  HeaderProfile,
  ImageLogo,
  ListDetails,
  Span,
  StyleButton,
  StyleHeader,
  StyleMenuItems,
  StyleProfile,
} from "./styles";
import { Avatar } from "antd";
import logo from "assets/images/home.png";
import {
  LogoutOutlined,
  EditOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoading } from "contexts/LoadingContext";
import useToken from "hooks/useToken";
import useOnClickOutside from "hooks/useOnClickOutside";
import { useAuthValue } from "hooks/useAuthContext";
import user from "assets/images/user.png";

const Header = () => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
    }, 200);
    return () => clearTimeout(timer);
  };

  const handleNavigateProfile = () => {
    setLoadingTrue();
    navigate("/profile");
    setLoadingFalse();
    setIsOpen(false);
  };

  const handleNavigateStatus = () => {
    setLoadingTrue();
    navigate("/");
    setLoadingFalse();
    setIsOpen(false);
  };

  const handleNavigateOrder = () => {
    setLoadingTrue();
    navigate("/order");
    setLoadingFalse();
    setIsOpen(false);
  };

  const handleNavigateHome = () => {
    setLoadingTrue();
    navigate("/");
    setLoadingFalse();
  };

  return (
    <StyleHeader>
      <StyleMenuItems onClick={handleNavigateHome}>
        <ImageLogo src={logo} alt="logo" />
        <div style={{ color: "#fff", fontSize: "18px" }}>DELIVERY</div>
      </StyleMenuItems>
      <StyleProfile>
        <StyleListHeader>
          {profile?.role === "user" ? (
            <StyleButton onClick={handleNavigateOrder}>
              <EditOutlined />
              Tạo đơn hàng
            </StyleButton>
          ) : null}
          <StyleButton onClick={handleNavigateStatus}>
            <SwapOutlined />
            Theo dõi đơn hàng
          </StyleButton>
            <Avatar
              onClick={() => setIsOpen(!isOpen)}
              src={profile?.avatar ? profile?.avatar : user}
              size="large"
              style={{ color: "#fff", cursor: "pointer" }}
            />
        </StyleListHeader>
        {isOpen && (
          <ListDetails ref={ref}>
            <HeaderProfile onClick={handleNavigateProfile}>
              <Avatar src={profile?.avatar ? profile?.avatar : user} />
              <Span>{profile?.fullName}</Span>
            </HeaderProfile>
            <HeaderProfile
              onClick={logout}
              style={{ borderTop: "1px solid rgb(239, 239, 239)" }}
            >
              <LogoutOutlined style={{ fontSize: "26px", color: "#08c" }} />
              <Span style={{ color: "red" }}>Đăng xuất</Span>
            </HeaderProfile>
          </ListDetails>
        )}
      </StyleProfile>
    </StyleHeader>
  );
};

export default Header;
