import Header from "components/Header";
import * as React from "react";

interface IBlankLayout {
  children: React.ReactNode;
}
export default function BlankLayout({ children }: IBlankLayout) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
