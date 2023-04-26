import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import {
  StyleContainer,
  StyleDes,
  StyleInfo,
  StyleTitle,
  StyleContent,
} from "./style";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Chờ xác nhận`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: "2",
    label: `Vận chuyển`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `Đang giao`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: "4",
    label: `Hoàn thành`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: "5",
    label: `Đã hủy`,
    children: `Content of Tab Pane 3`,
  },
];

const StatusOrder: React.FC = () => (
  <StyleContainer>
    <StyleInfo>
      <StyleTitle>Trạng thái đơn hàng</StyleTitle>
      <StyleDes>
        Trạng thái giao hàng liên quan đến việc vận chuyển của đơn hàng
      </StyleDes>
    </StyleInfo>
    <StyleContent>
      <Tabs  size="large" defaultActiveKey="1" items={items} onChange={onChange} />
    </StyleContent>
  </StyleContainer>
);

export default StatusOrder;
