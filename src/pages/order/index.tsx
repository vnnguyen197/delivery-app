import React from "react";
import {
  StyleButton,
  StyleContainer,
  StyleDes,
  StyleInfo,
  StyleInput,
  StyleListLeft,
  StyleListRight,
  StyleProfile,
  StyleTitle,
  StyleInfoUser,
} from "./style";
import { Input } from "antd";
import { useFormik } from "formik";
import { StyleError } from "styles/styleCommon";
import { addOrderSchema_ } from "validations/orderSchema";
import { useLoading } from "contexts/LoadingContext";
import orderAPI from "services/orderAPI";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { setLoadingTrue, setLoadingFalse } = useLoading();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      productVolume: "",
      description: "",
      senderName: "",
      senderPhone: "",
      senderAddress: "",
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
    },
    validationSchema: addOrderSchema_,
    onSubmit: async (values) => {
      setLoadingTrue();
      try {
        await orderAPI.createOrder(values);
        navigate("/")
        setLoadingFalse();
      } catch (error: any) {
        setLoadingFalse();
      }
    },
  });

  return (
    <StyleContainer onSubmit={formik.handleSubmit}>
      <StyleInfo>
        <StyleTitle>Đăng ký gởi hàng</StyleTitle>
        <StyleDes>
          Đăng ký gởi hàng liên quan đến các thông tin của đơn hàng
        </StyleDes>
      </StyleInfo>
      <StyleProfile>
        <StyleInput style={{ width: "50%" }}>
          <StyleInfoUser>Thông tin gói hàng</StyleInfoUser>
          <Input
            size="large"
            name="name"
            placeholder="Tên gói đơn"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && (
            <StyleError>{formik?.errors?.name}</StyleError>
          )}
        </StyleInput>
        <StyleInput style={{ width: "50%" }}>
          <Input
            type="number"
            size="large"
            name="productVolume"
            placeholder="Khối lượng (gam)"
            onChange={formik.handleChange}
            value={formik.values.productVolume}
          />
          {formik.errors.productVolume && (
            <StyleError>{formik?.errors?.productVolume}</StyleError>
          )}
        </StyleInput>
        <StyleInput style={{ width: "50%" }}>
          <Input
            size="large"
            name="description"
            placeholder="Chi tiết gói hàng"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description && (
            <StyleError>{formik?.errors?.description}</StyleError>
          )}
        </StyleInput>
        <StyleListRight>
          <StyleInput>
            <StyleInfoUser>Thông tin người gởi</StyleInfoUser>
            <Input
              size="large"
              name="senderName"
              placeholder="Họ và tên người gởi"
              onChange={formik.handleChange}
              value={formik.values.senderName}
            />
            {formik.errors.senderName && (
              <StyleError>{formik?.errors?.senderName}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="senderPhone"
              placeholder="Số điện thoại"
              onChange={formik.handleChange}
              value={formik.values.senderPhone}
            />
            {formik.errors.senderPhone && (
              <StyleError>{formik?.errors?.senderPhone}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="senderAddress"
              placeholder="Địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.senderAddress}
            />
            {formik?.errors?.senderAddress && (
              <StyleError>{formik?.errors?.senderAddress}</StyleError>
            )}
          </StyleInput>
        </StyleListRight>
        <StyleListLeft>
          <StyleInput>
            <StyleInfoUser>Thông tin người nhận</StyleInfoUser>
            <Input
              size="large"
              name="receiverName"
              placeholder="Họ và tên người nhận"
              onChange={formik.handleChange}
              value={formik.values.receiverName}
            />
            {formik.errors.receiverName && (
              <StyleError>{formik?.errors?.receiverName}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="receiverPhone"
              placeholder="Số điện thoại"
              onChange={formik.handleChange}
              value={formik.values.receiverPhone}
            />
            {formik.errors.receiverPhone && (
              <StyleError>{formik?.errors?.receiverPhone}</StyleError>
            )}
          </StyleInput>
          <StyleInput>
            <Input
              size="large"
              name="receiverAddress"
              placeholder="Địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.receiverAddress}
            />
            {formik?.errors?.receiverAddress && (
              <StyleError>{formik?.errors?.receiverAddress}</StyleError>
            )}
          </StyleInput>
        </StyleListLeft>
      </StyleProfile>
      <StyleButton type="submit">Tạo đơn</StyleButton>
    </StyleContainer>
  );
};

export default Order;
