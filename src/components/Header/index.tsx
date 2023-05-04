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
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoading } from "contexts/LoadingContext";
import useToken from "hooks/useToken";
import useOnClickOutside from "hooks/useOnClickOutside";

const Header = () => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const { remove } = useToken();

  const imgUser =
    "https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-1/340536787_719219749989277_7503381357964002337_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=yGxo3Uv0MLcAX8ZKaVe&_nc_ht=scontent.fdad2-1.fna&oh=00_AfAmddtxYjCTyH3aE56yb6VC0986kXY8X2f8d4k-h_kW6Q&oe=644D5AD2";
  const logout = async () => {
    setLoadingTrue();
    const timer = setTimeout(() => {
      setLoadingFalse();
      remove();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
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

  return (
    <StyleHeader>
      <StyleMenuItems>
        <ImageLogo src={logo} alt="logo" />
        <div style={{ color: "#fff", fontSize: "18px"}}>DELIVERY</div>
      </StyleMenuItems>
      <StyleProfile>
        <StyleListHeader>
          <StyleButton onClick={handleNavigateOrder}>
            <EditOutlined />
            Lên đơn hàng
          </StyleButton>
          <StyleButton onClick={handleNavigateStatus}>
            <SwapOutlined />
            Theo dõi đơn hàng
          </StyleButton>
          <Avatar
            onClick={() => setIsOpen(!isOpen)}
            src={imgUser}
            size="large"
            icon={<UserOutlined />}
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </StyleListHeader>
        {isOpen && (
          <ListDetails ref={ref}>
            <HeaderProfile onClick={handleNavigateProfile}>
              <Avatar src={imgUser} />
              <Span>Nguyen Van Nguyen</Span>
            </HeaderProfile>
            <HeaderProfile
              onClick={logout}
              style={{ borderTop: "1px solid rgb(239, 239, 239)" }}
            >
              <LogoutOutlined style={{ fontSize: "26px", color: "#08c" }} />
              <Span style={{color: 'red'}}>Đăng xuất</Span>
            </HeaderProfile>
          </ListDetails>
        )}
      </StyleProfile>
    </StyleHeader>
  );
};

export default Header;
