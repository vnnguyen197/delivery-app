import styled from "styled-components";

export const StyleContainer = styled.form`
  padding: 24px;
`;

export const StyleInfo = styled.div`
  border-bottom: 0.0625rem solid rgb(239, 239, 239);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 12px;
  border-radius: 8px;
`;

export const StyleTitle = styled.h2`
  font-size: 25px;
  color: #333333;
  font-weight: bold;
  margin: 4px 0 0px 0;
`;

export const StyleDes = styled.h1`
  font-size: 14px;
  line-height: 1.0625rem;
  color: rgb(136, 136, 136);
`;

export const StyleContent = styled.div`
  padding: 24px 0;
`;

export const StyleOrder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 12px;
  margin-bottom: 24px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f1f3fe;
  &:hover {
    color: blue;
  }
 
`;

export const StyleContentOrder = styled.div`
  width: 100%;
`;
export const StyleContentTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  /* color: #33303cde; */
  
`;

export const StyleContentDetails = styled.div`
  font-size: 16px;
  color: #33303cad;
`;

export const StyleContentSender = styled.div``;
export const StyleButton = styled.div`
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

export const StyleErrorPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyleEmptyOrder = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const StyleTitleEmpty = styled.div`
  color: #00467f;
  font-size: 16px;
  font-weight: 600;
`;
export const StyleContentCenter = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyleDetailTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #333333;
`;
export const StyleDetailSubTitle = styled.div`
  font-size: 14px;
  color: rgb(136, 136, 136);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
`;

export const StyleInfoUser = styled.div`
  font-size: 18px;
  line-height: 1.0625rem;
  color: #33303cde;
  padding-top: 24px;
  font-weight: 600;
  padding-bottom: 4px;
`;

export const StyleModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

