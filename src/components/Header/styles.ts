import styled from "styled-components";
import { LogoutOutlined } from "@ant-design/icons";

const StyleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background-color: #ff4e00;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);

  box-shadow: 0 0 30px rgba(97, 96, 136, 0.12);
  z-index: 999;
  gap: 14px;
`;

const StyleMenuItems = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  padding-inline-start: 0;
  cursor: pointer;
  padding-left: 24px;
  gap: 24px;
`;

interface MenuItemProps {
  active?: boolean;
}

const StyleMenuItem = styled.li<MenuItemProps>`
  cursor: pointer;
  color: ${(props) =>
    props.active ? props?.theme?.colors?.primary : props?.theme?.colors?.text};
  font-weight: ${(props) => props?.theme?.fontWeight?.bold};
  font-size: ${(props) => props?.theme?.fontSize?.md};
`;

const StyleProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;
  padding-right: 24px;
  svg {
    fill: ${(props) => props?.theme?.colors?.text};
    cursor: pointer;
    :hover {
      fill: ${(props) => props?.theme?.colors?.primary};
    }
  }
`;
const StyleIcon = styled.div`
  margin-right: 20px;
`;
const StyleOverLay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const StyleModal = styled.div`
  position: absolute;
  min-height: 400px;
  max-height: 600px;
  min-width: 500px;
  max-width: 600px;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  padding: 15px;
`;

const StyleSearch = styled.div`
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    font-size: 32px;
  }
  input {
    outline: none;
    width: 100%;
    border: 0;
    font-size: ${(props) => props?.theme?.fontSize?.md};
    padding: 10px 15px;
  }
`;

const StyleIntruction = styled.p`
  font-size: ${(props) => props?.theme?.fontSize?.sm};
  color: ${(props) => props?.theme?.colors?.blue};
  margin: 15px 0px;
`;

const StyleKeyWord = styled.span`
  background: ${(props) => props?.theme?.colors?.background};
  padding: 8px 4px;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const StyleKeyWordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 480px;
  overflow: auto;
`;

const StylePadding = styled.div`
  height: 80px;
`;

export {
  StyleHeader,
  StyleMenuItems,
  StyleProfile,
  StyleMenuItem,
  StyleModal,
  StyleOverLay,
  StyleSearch,
  StyleIntruction,
  StyleKeyWord,
  StyleKeyWordContainer,
  StylePadding,
  StyleIcon,
};

export const IconLogout = styled(LogoutOutlined)`
  width: 15px;
  height: 15px;
  margin-right: 0;
  color: red;
`;
export const ListDetails = styled.div`
  display: block;
  position: absolute;
  top: 70px;
  right: 6.5%;
  font-weight: normal;
  background-color: #fff;
  color: #212529;
  border-radius: 4px;
  z-index: 99;
  border: 1px solid #e7e7e7;
  &::before {
    content: " ";
    position: absolute;
    top: -16px;
    right: 8px;
    border: solid transparent;
    border-width: 8px;
    border-bottom-color: #fff;
  }
`;

export const StyleListHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;
export const Span = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #33303cde;
  padding: 8px;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Profile = styled.div`
  padding: 10px;
  border-bottom: 1px solid #efefef;
  border-top: 1px solid #efefef;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background-color: #e7e7e7;
  }
`;
export const Logout = styled.div`
  position: relative;
`;
export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  color: red;
  border-top: 1px solid #efefef;
  &:hover {
    background-color: #e7e7e7;
  }
`;
export const HeaderProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 170px;
  cursor: pointer;
  &:hover {
    background-color: rgb(231, 231, 231);
  }
`;
export const ImageLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
export const StyleImages = styled.div``;

export const StyleButton = styled.button`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin: auto;
  overflow: visible;
  min-width: 136px;
  height: 36px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  font-size: 14px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 1px 0px;
  border: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-transform: capitalize;
  outline: 0px;
  cursor: pointer;
  font-weight: bold;
  transition: all 400ms ease-in-out 0s;
  border-radius: 10px;
  background: orange;
  color: #fff;
  &:hover {
    background: #fff;
    color: orange;
  }
`;

