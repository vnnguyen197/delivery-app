import React, { useState } from "react";
import {
  AvatarDetails,
  HeaderProfile,
  ImageLogo,
  ListDetails,
  Span,
  StyleAvatar,
  StyleHeader,
  StyleMenuItems,
  StyleProfile,
} from "./styles";
import { Avatar } from "antd";
import logo from 'assets/images/delivery.png'
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <StyleHeader>
      <StyleMenuItems>
        {/* <a href={`/${router.locale}`}>
            <ImageLogo src={logo.src} alt="logo" />
          </a> */}
            {/* <ImageLogo src={logo} alt="logo" /> */}
            <div style={{color: '#fff', fontSize: "18px"}}>HOME</div>
      </StyleMenuItems>
      <StyleProfile>
        {/* <StyleAvatar> */}
          <AvatarDetails onClick={() => setIsOpen(!isOpen)} >
                  <Avatar size="large" icon={<UserOutlined />} style={{color: "#fff"}} />
          </AvatarDetails>
          {isOpen && (
            <ListDetails>
              <HeaderProfile onClick={()=> navigate('/profile')}>
                <Avatar
                // src={profile?.avatar}
                // sx={{ width: 35, height: 35, marginRight: 0 }}
                />
                <Span>Teennnn</Span>
              </HeaderProfile>
              {/* <Profile onClick={handleProfile}>
                <FormattedMessage id="header.profile" />
              </Profile> */}
              {/* {!isLoggedIn ? (
                <></>
              ) : (
                <Icons onClick={logout}>
                  <Logout>
                    {" "}
                    <FormattedMessage id="header.logOut" />
                  </Logout>
                  <IconLogout />
                </Icons>
              )}
            </ListDetails>
            */}
            </ListDetails>
          )}
        {/* </StyleAvatar> */}
      </StyleProfile>
    </StyleHeader>
  );
};

export default Header;
