import { Table } from "antd";
import React from "react";
import {
    StyleArea,
  StyleContainer,
  StyleDes,
  StyleInfo,
  StyleProfile,
  StyleTableTitle,
  StyleTitle,
} from "./style";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  index?: number;
  name: string;
  provincial?: string;
  intraDomain?: string;
  outOfRegion: string;
}

const dataSource: DataType[] = [
  {
    key: "1",
    name: "Thành phố",
    provincial: "16.000 (<3kg - Giao 6h)",
    intraDomain: "30.000 (<0.7kg - Giao 24h)",
    outOfRegion: "30.000 (<0.7kg - Giao 24h)",
  },
  {
    key: "2",
    name: "Huyện",
    provincial: "25.000 (<3kg - Giao 12h)",
    intraDomain: "30.000 (<0.7kg - Giao 48h)",
    outOfRegion: "30.000 (<0.7kg - Giao 48h)"

  },
  {
    key: "3",
    name: "Huyện xa",
    provincial: "25.000 (<3kg - Giao 12h)",
    intraDomain: "30.000 (<0.7kg - Giao 72h)",
    outOfRegion: "30.000 (<0.7kg - Giao 72h)"

  },
  {
    key: "2",
    name: "Vượt khối lượng",
    provincial: "+3.000/0.5kg",
    intraDomain: "+5.000/0.5kg",
    outOfRegion: "+5.000/0.5kg"
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: <StyleTableTitle>STT</StyleTableTitle>,
    dataIndex: "index",
    key: "index",
    width: 70,
    align: "center",
    render: (text: string, record: any, index: number) => index + 1,
  },
  {
    title: <StyleTableTitle>KHU VỰC</StyleTableTitle>,
    dataIndex: "name",
    key: "name",
    render: text => <StyleArea>{text}</StyleArea>,
  },
  {
    title: <StyleTableTitle>NỘI TỈNH</StyleTableTitle>,
    dataIndex: "provincial",
    key: "provincial",
  },
  {
    title: <StyleTableTitle>NỘI MIỀN (Đà Nẵng -{">"} Miền Trung)</StyleTableTitle>,
    dataIndex: "intraDomain",
    key: "intraDomain",
  },
  {
    title: <StyleTableTitle>NGOẠI MIỀN (Đà Nẵng -{">"} Miền Nam, Bắc)</StyleTableTitle>,
    dataIndex: "outOfRegion",
    key: "outOfRegion",
  },
];

export const PriceList = () => {
  return (
    <StyleContainer>
      <StyleInfo>
        <StyleTitle>Bảng giá đơn hàng</StyleTitle>
        <StyleDes>
        Bảng giá dịch vụ chuyển phát nhanh cho đơn hàng
        </StyleDes>
      </StyleInfo>
      <StyleProfile>
        <Table size="large" dataSource={dataSource} columns={columns} />
      </StyleProfile>
    </StyleContainer>
  );
};
