import * as React from "react";
import Header from "components/Header";
import {
  StyleContainer,
  StyleContent,
  StyleContentLeft,
  StyleContentRight,
} from "./style";
import CollapesedMenu from "components/CollapesedMenu";

interface IDefaultLayout {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: IDefaultLayout) {
  return (
    <StyleContainer>
      <Header />
      <StyleContent>
        <StyleContentLeft>
          <CollapesedMenu/>
        </StyleContentLeft>
        <StyleContentRight>{children}</StyleContentRight>
      </StyleContent>
    </StyleContainer>
  );
}
