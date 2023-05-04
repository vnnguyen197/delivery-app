import * as React from "react";
import Header from "components/Header";
import { StyleContainer } from "./style";

interface IDefaultLayout {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: IDefaultLayout) {
  return (
    <StyleContainer>
      <Header />
      {children}
    </StyleContainer>
  );
}
