import * as React from "react";
import { StyleContainer } from "./style";

interface IDefaultLayout {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: IDefaultLayout) {
  return <div>{children}</div>;
}
