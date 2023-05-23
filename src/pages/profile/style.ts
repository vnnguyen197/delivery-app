import styled from "styled-components";

export const StyleContainer = styled.form`
  padding: 24px;
`;

export const StyleProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
`;

export const StyleInfo = styled.div`
  border-bottom: 0.0625rem solid rgb(239, 239, 239);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 12px;
  border-radius: 8px;
`;

export const StyleDes = styled.h1`
  font-size: 14px;
  line-height: 1.0625rem;
  color: rgb(136, 136, 136);
`;

export const StyleListRight = styled.div`
  width: 80%;
  display: flex;
  gap: 24px;
`;

export const StyleListLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 30px;
  padding: 30px 0;
  gap: 4px;
`;

export const StyleInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const StyleLabel = styled.label`
  width: 20%;
  color: rgba(51, 48, 60, 0.87);
`;

export const StyleTitle = styled.h2`
  font-size: 25px;
  color: #333333;
  font-weight: bold;
  margin: 4px 0 0px 0;
`;

export const StyleAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  border: 3px dotted #536dfe;
  border-radius: 50%;
  padding: 4px;
`;

export const StyleItemRight = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyleItemLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyleTitleUser = styled.h1`
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  line-height: 1.5rem;
  letter-spacing: 0.0125em !important;
  color: var(--color-primary);
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyleRuleUser = styled.h5`
  margin: 0;
  color: #25c2a1;
`;

export const StyleField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const StyleButton = styled.button`
  margin: auto;
  color: rgb(255, 255, 255);
  overflow: visible;
  background-color: orange;
  width: 180px;
  height: 40px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  flex-direction: column;
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
  border-radius: 20px;
  &:hover {
    background: #fff;
    color: orange;
    border: 2px solid orange;
  }
`;

export const StyleError = styled.p`
  margin-bottom: 12px;
  padding-left: 125px;
  display: block;
  color: red;
  font-size: 14px;
  text-align: left;
  white-space: normal;
`;

export const ButtonImg = styled.button`
  border: none;
  padding: 0 !important;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transition: all 200ms;
  &:hover {
    opacity: 0.3;
    transform: scale(1.1);
  }
`

export const InputAvatar = styled.input`
  width: 200px;
  padding-top: 10px;
  margin: auto;
`;