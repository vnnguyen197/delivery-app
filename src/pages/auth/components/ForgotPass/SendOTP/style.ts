import styled from "styled-components";
import background from "assets/images/bgr.jpg";

export const StyleForm = styled.form`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  height: 100vh;
  background-color: gray;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const StyleContainer = styled.div`
  padding: 40px 50px;
  margin: 40px auto;
  text-align: center;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 8px;
  background-color: rgb(255, 255, 255);
`;

export const StyleTitle = styled.div`
  font-weight: bold;
  height: 50px;
  font-size: 24px;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const StyleInput = styled.div``;

export const StyleBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #33303cad;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  &:hover {
    color: blue;
  }
`;
