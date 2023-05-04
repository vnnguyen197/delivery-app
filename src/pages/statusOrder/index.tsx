import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import {
  StyleContainer,
  StyleDes,
  StyleInfo,
  StyleTitle,
  StyleContent,
  StyleContentOrder,
  StyleContentTitle,
  StyleContentDetails,
  StyleContentSender,
} from "./style";
import orderAPI from "services/orderAPI";

const onChange = (key: string) => {
  console.log(key);
};

const StatusOrder: React.FC = () => {
  const [data, setData] = useState([]);

  const filteredData = data?.filter((item: any) => item.status === "WAITING");

  const items: any = [
    {
      key: "1",
      label: `Chờ xác nhận`,
      children: filteredData?.map((item: any) => (
        <StyleContentOrder>
          <StyleContentTitle>{item?.name}</StyleContentTitle>
          <StyleContentDetails>mô tả: {item?.description}</StyleContentDetails>
          <StyleContentSender>người gởi: {item?.senderName}</StyleContentSender>
        </StyleContentOrder>
      )),
    },
    {
      key: "2",
      label: `Đang giao`,
      children: `Content of Đang giao`,
    },
    {
      key: "3",
      label: `Hoàn thành`,
      children: `Content of Hoàn thành`,
    },
    {
      key: "4",
      label: `Đã hủy`,
      children: `Content of Đã hủy`,
    },
  ];

  const fetchDataOrder = async () => {
    const listDataOrder = await orderAPI.getOrders();
    setData(listDataOrder?.data?.rows);
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  return (
    <StyleContainer>
      <StyleInfo>
        <StyleTitle>Trạng thái đơn hàng</StyleTitle>
        <StyleDes>
          Trạng thái giao hàng liên quan đến việc vận chuyển của đơn hàng
        </StyleDes>
      </StyleInfo>
      <StyleContent>
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </StyleContent>
    </StyleContainer>
  );
};

export default StatusOrder;
